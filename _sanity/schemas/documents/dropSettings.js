import { Settings } from '../../lib/icons'

export default {
  type: 'document',
  name: 'dropSettings',
  title: 'Drop Settings',
  icon: Settings,
  fields: [
    {
      type: 'string',
      name: 'documentName',
      title: 'Document Name',
      hidden: true,
      readOnly: true
    },
    {
      type: 'string',
      name: 'drop',
      title: 'Drop'
    },
    {
      type: 'twoUp',
      name: 'redemptionModal',
      title: 'Redemption Modal'
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
