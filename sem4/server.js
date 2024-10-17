const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const readUsersFromFile = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).send('Пользователь не найден');
    }
    
    res.json(user);
});

app.post('/users', (req, res) => {
    const users = readUsersFromFile();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...req.body,
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const users = readUsersFromFile();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).send('Пользователь не найден');
    }
    
    users[index] = { id: parseInt(req.params.id), ...req.body };
    writeUsersToFile(users);
    res.json(users[index]);
});

app.delete('/users/:id', (req, res) => {
    let users = readUsersFromFile();
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).send('Пользователь не найден');
    }
    
    users = users.filter((_, i) => i !== index);
    writeUsersToFile(users);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
