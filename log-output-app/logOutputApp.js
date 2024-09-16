const {v1: uuidv4} = require('uuid')

const randomString = uuidv4()

const getStringValue = () => {
  return new Date().toISOString() + " : " + randomString 
}

const startRandomStringLog = () => {

  const printString = () => {
    console.log(getStringValue())
    setTimeout(() => printString(), 5000)
  }
  printString()
}

module.exports = {getStringValue, startRandomStringLog}