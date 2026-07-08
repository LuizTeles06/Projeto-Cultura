import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN ativo: conteúdo público de leitura é servido pela edge cache do Sanity,
  // reduzindo latência e chamadas diretas à API (resiliência e custo).
  useCdn: true,
})
