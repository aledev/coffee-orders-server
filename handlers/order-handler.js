const { Order } = require('../models/order')

let orders = [
    {
        id: 1,
        name: 'John Doe',
        coffeeName: 'Hot Coffee',
        total: 4.5,
        size: 'Medium'
    }, 
    {
        id: 2,
        name: 'Mary Doe',
        coffeeName: 'Frappuccino',
        total: 5.6,
        size: 'Small'
    }
]

let testOrders = [
    {
        id: 1,
        name: 'John Doe',
        coffeeName: 'Hot Coffee',
        total: 4.5,
        size: 'Medium'
    }, 
    {
        id: 2,
        name: 'Mary Doe',
        coffeeName: 'Frappuccino',
        total: 5.6,
        size: 'Small'
    }
]

// COFFEE ORDERS
const newOrder = async (req, res) => {
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
}

const updateOrder = async (req, res) => {
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
}

const deleteOrder = async (req, res) => {    
    const orderId = parseInt(req.params.id)
    console.debug(`Order to delete: ${orderId}`)

    const order = testOrders.find(order => order.id == orderId)
    testOrders = testOrders.filter(order => order.id != order.id)

    res.status(200)
        .json(order)
}

const getAllOrders = async (_, res) => {
    res.status(200)
        .json(testOrders)
}

const getOrder = async (req, res) => {
    const orderId = parseInt(req.params.id)
    console.debug(`Getting order id: ${orderId}`)

    const order = testOrders.find(order => order.id == orderId)

    res.status(200)
        .json(order)
}

const clearOrders = async (_, res) => {
    testOrders = []
    res.status(200)
        .json({
            message: 'Orders have been cleared!'
        })
}

module.exports = { 
    newOrder, 
    deleteOrder, 
    updateOrder, 
    getAllOrders, 
    getOrder,
    clearOrders
}
