const express = require('express')
const app = express()
const port = 80

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})

app.use(express.static('static'));
