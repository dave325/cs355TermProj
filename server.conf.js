require('dotenv').config()
console.log("Proxy called " + process.env.PORT);
const CONFIG = [
  {
    context: ["/api"],
    "target": "http://localhost:" + (process.env.PORT || '8000'),
    "secure": false
  }
]

module.exports = CONFIG;