const { readFileSync } = require('node:fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const logFileName = logPath+'/logs.txt'

const randomString = uuidv4()

const readFromFile = () => {
  const data = readFileSync(logFileName, 'utf8')
  return data  
}

const getTimestampAndRandomString = () => {
  const timeStamp = readFromFile()
  return timeStamp + " : " + randomString
} 

module.exports = {getTimestampAndRandomString}
