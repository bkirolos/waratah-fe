const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const csvFile = path.resolve(__dirname, 'nfts.csv')

csv()
  .fromFile(csvFile)
  .then(data => {
    const json = data.map(nft => ({
      _id: nft.id,
      _type: 'nftAsset',
      backgroundColor: nft.backgroundColor,
      image: {
        _type: 'imagePlus',
        _sanityAsset: `image@file:///${path.resolve(
          __dirname,
          'images/',
          nft.imageAssetName
        )}`,
        alt: `Oregon Ducks logo against ${
          ['a', 'e', 'i', 'o', 'u'].includes(
            nft.backgroundColor[0].toLowerCase()
          )
            ? 'an'
            : 'a'
        } ${nft.backgroundColor.toLowerCase()} background`
      },
      shoeSize: nft.shoeSize,
      stripes: nft.stripes === 'Y',
      title: nft.title,
      video: {
        _type: 'video',
        url: nft.videoUrl
      }
    }))

    const ndjson = json.map(JSON.stringify).join('\n')
    fs.writeFileSync('import/nfts.ndjson', ndjson)
  })
