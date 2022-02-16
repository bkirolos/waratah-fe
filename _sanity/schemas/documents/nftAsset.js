export default {
  type: 'document',
  name: 'nftAsset',
  title: 'NFT Asset',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name'
    },
    {
      type: 'string',
      name: 'shoeSize',
      title: 'Shoe Size'
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
      name: 'backgroundColor',
      title: 'Background Color'
    },
    {
      type: 'boolean',
      name: 'stripes',
      title: 'Stripes'
    }
  ],
  preview: {
    select: {
      image: 'image',
      name: 'name'
    },
    prepare(selection) {
      const { image, name } = selection
      return {
        title: name,
        media: image
      }
    }
  }
}
