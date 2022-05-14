export default {
  type: 'object',
  name: 'redeemSettings',
  title: 'Redeem Settings',
  fields: [
    {
      type: 'twoUp',
      name: 'redeemLanding',
      title: 'Redeem Landing Modal'
    },
    {
      type: 'string',
      name: 'redeemHeading',
      title: 'Redeem Heading'
    },
    {
      type: 'portableTextLite',
      name: 'redeemDescription',
      title: 'Redeem Description'
    },
    {
      type: 'countdown',
      name: 'redeemCountdown',
      title: 'Redeem Countdown'
    }
  ]
}
