const { readFileSync } = require('node:fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const axios = require('axios')

const logPath =  path.join('/', 'usr', 'src', 'app', 'files')
const configMapPath =  path.join('/', 'usr', 'src', 'app', 'config-map')
const timeStampFile = logPath+'/logs.txt'
const informationFile = configMapPath+'/information.txt'

const randomString = uuidv4()

const getTimestampAndRandomString = () => {
  const timeStampData = readFileSync(timeStampFile, 'utf8')
  return timeStampData + " : " + randomString
} 

const readInformationFile = () => {
  const data = readFileSync(informationFile, 'utf-8')
  return data
}

const getPingPongData = async () => {
  const pingPongData = await axios.get('http://ping-pong-app:4444/api/get-number')
  return pingPongData.data
}

module.exports = {getTimestampAndRandomString, readInformationFile, getPingPongData}
