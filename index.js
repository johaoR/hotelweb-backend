const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configura tu conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Tu usuario de MySQL
  password: '',        // Tu contraseña de MySQL (déjala vacía si no tienes)
  database: 'hotelweb' // El nombre de tu base de datos
});

// Prueba la conexión
db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Endpoint para registrar cliente
app.post('/api/clientes', (req, res) => {
  const { nombre, email, password, telefono } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const sql = 'INSERT INTO clientes (nombre, email, password, telefono) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, email, password, telefono], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ message: 'Error al registrar cliente' });
    }
    res.json({ message: '¡Cliente registrado exitosamente!' });
  });
});

// Iniciar el servidor
app.listen(8080, () => {
  console.log('Servidor backend escuchando en http://localhost:8080');
});
