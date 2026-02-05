import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Postagem', 
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título', 
      type: 'string',
    }),
    defineField({
      name: 'Linha',
      title: 'Linha-Fina',
      type: 'string',
      description: 'Subtítulo ou resumo curto abaixo do título'
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria do Esporte',
      type: 'string', 
      options: {
        list: [
          { title: '⚽ Futebol', value: 'futebol' },
          { title: '🏐 Vôlei', value: 'volei' },
          { title: '🏀 Basquete', value: 'basquete' },
          { title: '⚽ Futsal', value: 'futsal' },
          { title: '🏅 Outros Esportes', value: 'outros' },
        ],
        layout: 'dropdown' 
      },
      validation: rule => rule.required() 
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true, 
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo', 
          description: 'Descreva a imagem para leitores de tela e SEO'
        }
      ]
    }),
    defineField({
      name: 'link',
      title: 'Link Externo',
      type: 'url', 
      description: 'Link opcional para referência externa'
    }),
  ],
})