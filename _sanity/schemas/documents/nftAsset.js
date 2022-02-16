export default {
  type: 'document',
  name: 'nftAsset',
  title: 'NFT Asset',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      readOnly: true
    },
    {
      type: 'string',
      name: 'shoeSize',
      title: 'Shoe Size',
      readOnly: true
    },
    {
      type: 'imagePlus',
      name: 'image',
      title: 'Image',
      readOnly: true
    },
    {
      type: 'video',
      name: 'video',
      title: 'Video',
      readOnly: true
    },
    {
      type: 'string',
      name: 'backgroundColor',
      title: 'Background Color',
      readOnly: true
    },
    {
      type: 'boolean',
      name: 'stripes',
      title: 'Stripes',
      readOnly: true
    }
  ],
  preview: {
    select: {
      image: 'image',
      title: 'title'
    },
    prepare(selection) {
      const { image, title } = selection
      return {
        title,
        media: image
      }
    }
  }
}
