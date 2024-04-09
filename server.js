import express from "express"
import cors from "cors"

const server = express()
server.use(cors())

server.use(express.static('./dist'))

server.get('/', (req, res) => {
    res.sendFile('./dist/index.html')
})

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/')
})