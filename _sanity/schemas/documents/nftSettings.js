export default {
  type: 'document',
  name: 'nftSettings',
  title: 'NFT Settings',
  fields: [
    {
      type: 'string',
      name: 'documentName',
      title: 'Document Name',
      hidden: true,
      readOnly: true
    },
    {
      type: 'portableTextLite',
      name: 'nftDescription',
      title: 'NFT Description'
    },
    {
      type: 'portableTextLite',
      name: 'shoeDescription',
      title: 'Shoe Description'
    },
    {
      type: 'imagePlus',
      name: 'shoeImage',
      title: 'Shoe Image',
      description: 'Image should have a square aspect ratio'
    }
  ],
  preview: {
    select: {
      documentName: 'documentName'
    },
    prepare(selection) {
      const { documentName } = selection
      return {
        title: documentName
      }
    }
  }
}
