require('dotenv').config()
console.log(process.env.PORT);
const CONFIG = [
{
    "/api": {
      "target": "http://localhost:" + (process.env.PORT || '8000'),
      "secure": false
    }
  }
]

module.exports = CONFIG;