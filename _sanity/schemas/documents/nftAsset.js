export default {
  type: 'document',
  name: 'nftAsset',
  title: 'NFT Asset',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
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
