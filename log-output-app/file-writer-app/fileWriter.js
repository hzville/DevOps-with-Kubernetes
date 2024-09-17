const path = require('path')
const { writeFile, mkdirSync } = require('node:fs')
const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const logFileName = logPath+'/logs.txt'

const createLogFile = () => {
  mkdirSync(logPath, { recursive: true }, (error) => {
    console.log('Error writing file ', error)
  })
}

const writeToFile = () => {
  const date = new Date().toISOString()
  writeFile(logFileName, date, err => {
    if (err) {
      console.log('error was ',err)
    }
  })
  setTimeout(() => writeToFile(), 5000)
}
createLogFile()
writeToFile()