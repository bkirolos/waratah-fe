export default {
  computed: {
    footerLinks() {
      return [
        ...this.headerLinks,
        {
          label: 'Terms & Conditions',
          url: '/terms-and-conditions'
        },
        {
          label: 'Privacy Policy',
          url: '/privacy-policy'
        }
      ]
    },
    headerLinks() {
      return [
        {
          label: 'The NFT',
          url: '/#the-nft'
        },
        {
          label: 'The Shoe',
          url: '/#the-shoe'
        },
        {
          label: 'The Athletes',
          url: '/#the-athletes'
        },
        {
          label: 'The Auction',
          url: '/#the-auction'
        },
        {
          label: 'FAQ',
          url: '/#faq'
        },
        {
          label: 'Buy Now',
          url: '/flyingformations',
          class: 'text-lime'
        }
      ]
    }
  }
}
