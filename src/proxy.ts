import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware de borda: rate limiting best-effort + bloqueio de bots abusivos.
 *
 * IMPORTANTE (limitação honesta): o contador abaixo é EM MEMÓRIA e por instância.
 * Na Vercel (serverless/edge) o estado NÃO é compartilhado entre instâncias e é
 * reiniciado a cada cold start. Isso já mitiga rajadas simples e scrapers ingênuos,
 * mas para rate limiting distribuído de verdade use um store externo
 * (ex.: Upstash Redis / @upstash/ratelimit) ou o Vercel Firewall/WAF.
 */

// Janela deslizante simples: N requisições por IP dentro de WINDOW_MS.
const WINDOW_MS = 60_000; // 1 minuto
const MAX_REQUESTS = 100; // limite geral por IP/minuto
const MAX_REQUESTS_STUDIO = 30; // limite mais estrito para a área de edição

type Hit = { count: number; resetAt: number };
const hits = new Map<string, Hit>();

// Limpeza periódica para não vazar memória com IPs antigos.
function sweep(now: number) {
  if (hits.size < 5_000) return;
  for (const [key, hit] of hits) {
    if (hit.resetAt <= now) hits.delete(key);
  }
}

function rateLimit(key: string, limit: number, now: number): { limited: boolean; retryAfter: number } {
  const existing = hits.get(key);
  if (!existing || existing.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  existing.count += 1;
  if (existing.count > limit) {
    return { limited: true, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

// User-agents de bots agressivos/scrapers conhecidos que não trazem valor a um
// portal de notícias. Bots legítimos (Googlebot, Bingbot) NÃO são bloqueados.
const BLOCKED_UA = /(AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|DataForSeoBot|Bytespider|ClaudeBot|GPTBot|CCBot)/i;

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? '0.0.0.0';
}

export function proxy(req: NextRequest) {
  const now = Date.now();
  sweep(now);

  const ua = req.headers.get('user-agent') ?? '';
  if (BLOCKED_UA.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const ip = getClientIp(req);
  const isStudio = req.nextUrl.pathname.startsWith('/studio');
  const limit = isStudio ? MAX_REQUESTS_STUDIO : MAX_REQUESTS;

  const { limited, retryAfter } = rateLimit(`${ip}:${isStudio ? 'studio' : 'site'}`, limit, now);
  if (limited) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    });
  }

  return NextResponse.next();
}

// Aplica a tudo, exceto assets estáticos e otimização de imagem.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)'],
};
