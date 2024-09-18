const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { mkdirSync, existsSync, writeFile, readFileSync } = require('node:fs')

const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const logFileName = logPath+'/image.jpg'
const dateFile = logPath+'/logfile.txt'

const createImageFolder = () => {
  mkdirSync(logPath, { recursive: true }, (error) => {
    console.log('Error writing file ', error)
  })
}

const checkIfImageExists = () => {
  if (existsSync(logFileName)) {
    const imageAgeInMs = readFileSync(dateFile, 'utf-8')
    const imageMaxAgeMs = Number(imageAgeInMs) + 3600000
    if (Number(imageMaxAgeMs < Date.now())){
      getNewImage()
    }
  } else {
    getNewImage()
  }
}

const getNewImage = async () => {
  const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(logFileName))
  const dateInMs = Date.now()
  writeFile(dateFile, dateInMs.toString(), err => {
    if (err) {
      console.log('error writing log file ', err)
    }
  })
}

module.exports = {createImageFolder, checkIfImageExists}