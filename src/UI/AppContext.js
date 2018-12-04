const readline = require('readline');

const Console = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

export { Console };