export default {
  type: 'document',
  name: 'drops',
  title: 'Drops',

  fields: [
    {
      type: 'string',
      name: 'drop',
      title: 'Drop'
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'URL'
    },
    {
      type: 'redeemSettings',
      name: 'redeemSettings',
      title: 'Redeem Settings'
    }
  ],
  preview: {
    select: {
      title: 'drop'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title
      }
    }
  }
}
