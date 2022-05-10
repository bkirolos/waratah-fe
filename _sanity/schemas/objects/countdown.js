export default {
  type: 'object',
  name: 'countdown',
  title: 'Countdown',
  options: {
    collapsable: true,
  },
  fields: [
    {
      type: 'number',
      name: 'startTime',
      title: 'Start Time',
      description: 'Set in Epoch Time'
    },
    {
      type: 'number',
      name: 'endTime',
      title: 'End Time',
      description: 'Set in Epoch Time',
      validation: Rule => Rule.required().error('Ending Time is required')
    },
    {
      type: 'string',
      name: 'beforeText',
      title: 'Before Go Live Text'
    },
    {
      type: 'string',
      name: 'liveText',
      title: 'Live Text'
    },
    {
      type: 'string',
      name: 'completedText',
      title: 'Completed Text'
    },
  ],
}
