const connecttoMongo = require('./db');
const express = require('express')
const cors = require('cors')
const app = express()

// run the function here 
connecttoMongo();
const port = 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.end("hello")
})
app.use('/api/notes', require('./routes/notes'))
app.use('/api/authentication', require('./routes/authentication'))

app.listen(port, () => {
  console.log(`iNotebook  listening on port ${port}`)
})