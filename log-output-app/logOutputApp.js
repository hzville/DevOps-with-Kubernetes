const {v1: uuidv4} = require('uuid')

const randomString = uuidv4()

const printString = (string) => {
  console.log(new Date().toISOString(), ":", string)
  setTimeout(() => printString(randomString), 5000)
}
printString(randomString)