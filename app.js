const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const orderHandler = require('./handlers/order-handler')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// CORS: Allow all
app.use(cors({
    origin: '*'
}))

let testOrders = []

// COFFEE ORDERS
app.post('/test/new-order', orderHandler.newOrder)
app.put('/test/orders/:id', orderHandler.updateOrder)
app.delete('/test/orders/:id', orderHandler.deleteOrder)
app.get('/test/orders', orderHandler.getAllOrders)
app.get('/test/orders/:id', orderHandler.getOrder)
app.get('/test/clear-orders', orderHandler.clearOrders)

// Port Configuration
const port = process.env.PORT || 3000
// Start listening
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})