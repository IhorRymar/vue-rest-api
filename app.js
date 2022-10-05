const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
// const { nanoid } = require('nanoid');

const contactsRouter = require('./routes/api/contacts');

const app = express();

app.use(express.json());

const CONTACTS = path.join(__dirname, './models/contacts.json');

app.get('/api/contacts', (req, res) => {
  res.status(200).sendFile(CONTACTS);
});

// app.post('/api/contacts', (req, res) => {
//   const contact = { ...req.body, id: nanoid(), marked: false };
//   CONTACTS.push(contact);
//   res.status(201).json(contact);
// });

// app.delete('/api/contacts:id', (req, res) => {
//   CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id)
//   res.status(200).json({ message: 'Contacts deleted successfully' });
// });

// app.delete('/api/contacts:id', (req, res) => {
//   const index = CONTACTS.filter((contact) => contact.id !== req.params.id);
//   // const [result] = CONTACTS.splice(index, 1);
//   res.status(200).json({ message: 'Contacts deleted successfully' });
// });

app.use(express.static(path.resolve(__dirname, 'models')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'models', 'index.html'));
});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());

app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
