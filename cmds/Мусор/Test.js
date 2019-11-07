const DL = require('dream.log');
module.exports.run = async (bot, message, args) => {
let log = new DL.log('Hello');
console.log(log)
}
module.exports.command = {
name: 'test'
}