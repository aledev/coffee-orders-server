const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { Order } = require('./models/order')
 
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
app.post('/test/new-order', (req, res) => {
    console.debug(`New Order`)
    
    const name = req.body.name
    const coffeeName = req.body.coffeeName
    const total = parseFloat(req.body.total)
    const size = req.body.size

    if (name && coffeeName && total && size) {
        let order = new Order(name, coffeeName, total, size)
        testOrders.push(order)

        order.id = testOrders.length + 1

        res.status(200)
        .json(order)

    } else {
        res.status(400)
        .json({
            success: false,
            message: 'Missing fields'
        })
    }
})

app.put('/test/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id)
    console.debug(req.body)

    const name = req.body.name
    const coffeeName = req.body.coffeeName
    const total = parseFloat(req.body.total)
    const size = req.body.size

    // get the order you want to update
    let updateOrder = testOrders.find(order => order.id == orderId)

    if (updateOrder) {
        updateOrder.name = name
        updateOrder.coffeeName = coffeeName
        updateOrder.total = total
        updateOrder.size = size

        console.debug(`Order Detail: \n${updateOrder}`)

        res.status(200)
            .json(updateOrder)

    } else {
        res.status(400)
            .json({
                success: false,
                message: 'Wrong order!'
            })
    }
})

app.delete('text/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id)
    console.debug(`Order to delete: ${orderId}`)

    const order = testOrders.find(order => order.id == orderId)
    testOrders = testOrders.filter(order => order.id != order.id)

    res.status(200)
        .json(order)
})

app.get('/test/orders', (_, res) => {
    res.status(200)
        .json(testOrders)
})

app.get('/test/clear-orders', (_, res) => {
    testOrders = []
    res.status(200)
        .json({
            message: 'Orders have been cleared!'
        })
})

const port = process.env.PORT || 3000
// Start listening
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})