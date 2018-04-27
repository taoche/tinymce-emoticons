const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')

function fromDir(startPath, filter) {
  const files = fs.readdirSync(startPath)

  return files.map(file => {
    const filename = path.join(startPath, file)
    const stat = fs.lstatSync(filename)

    if (stat.isDirectory()) {
      fromDir(filename, filter)
    } else if (filename.indexOf(filter) >= 0) {
      return filename
    }
  })
}

fromDir('./images', '.png').forEach(image => {
  Jimp.read(image)
    .then(function(lenna) {
      return lenna.resize(30, 30).write(`./output/${path.basename(image)}`)
    })
    .catch(function(err) {
      console.error(err)
    })
})

const imagesJson = {}
const imgDir = path.join(__dirname, 'output')
const distPath = path.join(__dirname, '../src', 'emoticons.json')

fs.readdirSync(imgDir).map(name => {
  if (path.extname(name) === '.png') {
    const data = fs.readFileSync(path.join(imgDir, name), {
      encoding: 'binary',
    })

    const base64 = new Buffer(data, 'binary').toString('base64')
    imagesJson[name.replace('.png', '')] = `data:image/png;base64,${base64}`
  }
})

fs.writeFileSync(distPath, JSON.stringify(imagesJson), { encoding: 'utf8' })
