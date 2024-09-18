const { readFileSync } = require('node:fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const timeStampFile = logPath+'/logs.txt'
const pingPongFile = logPath+'/pingponglogs.txt'

const randomString = uuidv4()

const getTimestampAndRandomString = () => {
  const timeStampData = readFileSync(timeStampFile, 'utf8')
  return timeStampData + " : " + randomString
} 

const getPingPongData = () => {
  const pingPongData = readFileSync(pingPongFile, 'utf8')
  return pingPongData
}

module.exports = {getTimestampAndRandomString, getPingPongData}
