import { Question } from '../../lib/icons'

export default {
  type: 'document',
  name: 'nftAsset',
  title: 'NFT Asset',
  fields: [
    {
      type: 'string',
      name: 'nftId',
      title: 'NFT ID',
      validation: Rule => Rule.required()
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'nftID'
      },
      validation: Rule => Rule.required()
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title'
    },
    {
      type: 'string',
      name: 'shoeSize',
      title: 'Show Size',
      options: {
        list: [
          '4',
          '4.5',
          '5',
          '5.5',
          '6',
          '6.5',
          '7',
          '7.5',
          '8',
          '8.5',
          '9',
          '9.5',
          '10',
          '10.5',
          '11',
          '11.5',
          '12'
        ]
      }
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imagePlus'
    },
    {
      type: 'portableTextSuite',
      name: 'description',
      title: 'Description'
    }
  ]
}
