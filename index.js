const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('API REST en Node.js');
});

// Agrega tus rutas aquí
const users = [{ id: 1, name: "Juan" }, { id: 2, name: "Ana" }];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) res.json(user);
    else res.status(404).send('Usuario no encontrado');
});

app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        Object.assign(user, req.body);
        res.json(user);
    } else res.status(404).send('Usuario no encontrado');
});

app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.sendStatus(204);
    } else res.status(404).send('Usuario no encontrado');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
