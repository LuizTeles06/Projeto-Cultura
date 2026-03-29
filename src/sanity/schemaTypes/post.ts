import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons' 

export const post = defineType({
  name: 'post',
  title: 'Postagens', 
  type: 'document',
  icon: DocumentTextIcon, 
  fields: [
    defineField({
      name: 'title',
      title: 'Título', 
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'Linha',
      title: 'Linha-Fina',
      type: 'string',
      description: 'Subtítulo ou resumo curto abaixo do título'
    }),
    defineField({
      name: 'coverImage', 
      title: 'Foto de Capa (Principal)',
      type: 'image',
      options: { hotspot: true },
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
          { title: '🤾 Handebol', value: 'handebol' },
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
      validation: rule => rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem Secundária (Conteúdo)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'legenda',
      title: 'Legenda da Imagem',
      type: 'string',
      description: 'Legenda exibida abaixo da imagem secundária',
    }),
    defineField({
      name: 'link',
      title: 'Link Externo',
      type: 'url', 
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'Linha',      
      media: 'coverImage',    
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle || 'Sem descrição',
        media: media,
      }
    },
  },
})