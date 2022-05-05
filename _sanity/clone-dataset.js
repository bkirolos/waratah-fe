'use strict'

const datasetToClone = process.argv[2]
const newDataset = process.argv[3]

/*
data to clone from = production
data to clone to = sandbox

will create dataset if it doesn't exist

example - yarn run clonedataset production sandbox
*/

if (datasetToClone === '-h')
  return 'param 1: data set to clone, param 2: new data set'

console.log(datasetToClone)

const { spawn } = require('child_process')
const fs = require('fs')

const exportDataset = spawn('sanity', [
  'dataset',
  'export',
  `${datasetToClone}`
])

exportDataset.stdout.on('data', data => {
  console.log(`stdout: ${data}`)
  exportDataset.stdin.write('\n')
})

exportDataset.stderr.on('data', data => {
  console.log(`stderr: ${data}`)
})

exportDataset.on('close', code => {
  const path = `${__dirname}/${datasetToClone}.tar.gz`
  console.log(`download exited with code ${code}`)
  if (code === 0) {
    const unzip = spawn('tar', ['-xvf', `${path}`])

    unzip.stdout.on('data', data => {
      console.log(`stdout: ${data}`)
    })

    unzip.stderr.on('data', data => {
      console.log(`stderr: ${data}`)
    })

    unzip.on('close', code => {
      console.log(`unzip exited with code ${code}`)

      fs.rmSync(`${__dirname}/${datasetToClone}.tar.gz`, {
        force: true
      })

      fs.readdir(process.cwd(), function (err, files) {
        if (err) {
          console.log(err)
          return
        }
        const unzippedDirName = files.filter(file =>
          file.includes(`${datasetToClone}-export`)
        )[0]

        const upzippedPath = `${__dirname}/${unzippedDirName}/data.ndjson`

        const upload = spawn('sanity', [
          'dataset',
          'import',
          `${upzippedPath}`,
          `${newDataset}`
        ])

        upload.stdout.on('data', data => {
          console.log(`stdout: ${data}`)
          upload.stdin.write('\n')
        })

        upload.stderr.on('data', data => {
          console.log(`stderr: ${data}`)
        })

        upload.on('close', code => {
          console.log(`upload exited with code ${code}`)

          fs.rmdirSync(`${__dirname}/${unzippedDirName}`, {
            force: true,
            recursive: true
          })
        })
      })
    })
  }
})
