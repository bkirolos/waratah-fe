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
      type: 'twoUp',
      name: 'twoUp',
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
