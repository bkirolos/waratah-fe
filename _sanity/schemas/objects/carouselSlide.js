import { Image } from '../../lib/icons'

export default {
  type: 'object',
  name: 'carouselSlide',
  title: 'Carousel Slide',
  icon: Image,
  validation: Rule =>
    Rule.custom(object => {
      return !object?.image?.asset && !object?.video?.url
        ? 'Image or Video is required'
        : true
    }),
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
      hidden: document => document.parent.video?.url
    },
    {
      type: 'video',
      name: 'video',
      title: 'Video',
      hidden: document => document.parent.image?.asset
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
      internalName: 'internalName',
      video: 'video'
    },
    prepare(selection) {
      const { image, internalName, video } = selection
      const media = image?.asset || video?.poster

      return {
        title: internalName,
        media
      }
    }
  }
}
