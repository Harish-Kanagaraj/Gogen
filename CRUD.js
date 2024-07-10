const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Harish' },
    { id: 2, name: 'Hari' }
];
app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let updateUser = req.body;
    let index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updateUser };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
});
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        let deletedUser = users.splice(index, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).send('User not found');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
