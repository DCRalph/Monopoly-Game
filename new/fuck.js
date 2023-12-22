
const {hash} = require('bcrypt')

const password =  hash('test', 12) .then((x) => {
  console.log(x)
})

console.log(password)