import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      
      // Notícias (Lista com Detalhes)
      S.documentTypeListItem('post')
        .title('Notícias')
        .child(
          S.documentTypeList('post')
            .title('Todas as Notícias')
            // Removemos o 'media' para voltar a aparecer os textos
            // Adicionamos ordenação: Mais recentes primeiro
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}]) 
        ),

    ])