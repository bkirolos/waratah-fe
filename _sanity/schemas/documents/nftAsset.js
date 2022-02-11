export default {
  type: 'document',
  name: 'nftAsset',
  title: 'NFT Asset',
  fields: [
    {
      type: 'slug',
      name: 'tokenId',
      title: 'Token Id',
      validation: Rule => Rule.required()
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      description: "Click 'Generate' to auto-generate a slug for this page",
      options: {
        source: 'tokenId',
        slugify: input => {
          return `ducks-of-a-feather-${input.current}`
        }
      },
      validation: Rule => Rule.required()
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image'
    },
    {
      type: 'video',
      name: 'video',
      title: 'Video'
    },
    {
      type: 'string',
      name: 'shoeSize',
      title: 'Show Size',
      options: {
        list: [
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
          '12',
          '12.5',
          '13',
          '14',
          '15'
        ]
      }
    },
    {
      type: 'boolean',
      name: 'stripes',
      title: 'Stripes'
    },
    {
      type: 'string',
      name: 'backgroundColor',
      title: 'Background Color'
    }
  ],
  preview: {
    select: {
      title: 'slug.current'
    }
  }
}
