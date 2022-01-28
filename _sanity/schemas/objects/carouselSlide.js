import { Image } from '../../lib/icons'

export default {
  type: 'object',
  name: 'carouselSlide',
  title: 'Carousel Slide',
  icon: Image,
  fields: [
    {
      type: 'string',
      name: 'internalName',
      title: 'Internal Name'
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      validation: Rule =>
        Rule.custom(image => {
          return !!image?.asset || 'Image is required'
        })
    },
    {
      type: 'string',
      name: 'width',
      title: 'Width',
      initialValue: 'medium',
      options: {
        list: [
          { title: 'Thin', value: 'thin' },
          { title: 'Medium', value: 'medium' },
          { title: 'Wide', value: 'wide' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      }
    }
  ],
  preview: {
    select: {
      image: 'image',
      internalName: 'internalName'
    },
    prepare(selection) {
      const { image, internalName } = selection
      return {
        title: internalName,
        media: image
      }
    }
  }
}
