const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const customers = [
    { title: 'George', id: 1 },
    { title: 'Josh', id: 2 },
    { title: 'Tyler', id: 3 },
    { title: 'Alice', id: 4 },
    { title: 'Candice', id: 5 }
];

// ROOT ROUTE
app.get('/', (req, res) => {
    res.send('Welcome to REST API!');
});

// GET ALL CUSTOMERS
app.get('/api/customers', (req, res) => {
    res.send(customers);
});

// GET A SINGLE CUSTOMER BY ID
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send('<h2 style="font-family: Malgun Gothic;color:darkred;">Oops... Can\'t find what you are looking for!</h2>');
    }
    res.send(customer);
});

// POST - ADD NEW CUSTOMER
app.post('/api/customers', (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

// PUT - UPDATE CUSTOMER
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send('<h2 style="font-family: Malgun Gothic;color:darkred;">Customer not found!</h2>');
    }

    const { error } = validateCustomer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    customer.title = req.body.title;
    res.send(customer);
});

// DELETE - REMOVE CUSTOMER
app.delete('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send('<h2 style="font-family: Malgun Gothic;color:darkred;">Customer not found!</h2>');
    }

    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});

// VALIDATION FUNCTION
function validateCustomer(customer) {
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    });
    return schema.validate(customer);
}

// SERVER LISTENING ON PORT 3000
app.listen(3000, () => {
    console.log('Server running on port 3000...');
});




