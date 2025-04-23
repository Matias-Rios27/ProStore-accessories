const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos');

    db.query('SELECT * FROM usuarios WHERE correo = "admin@admin.com"', (err, results) => {
        if (err) return console.error('Error al verificar admin:', err);

        if (results.length === 0) {
            const nombre = 'admin';
            const correo = 'admin@admin.com';
            const contraseña = 'admin123';

            const insertSql = 'INSERT INTO usuarios (nombre, correo, contrasenia) VALUES (?, ?, ?)';
            db.query(insertSql, [nombre, correo, contraseña], (err, result) => {
                if (err) {
                    return console.error('Error al insertar admin:', err);
                }
                console.log('Usuario admin creado por defecto');
            });
        } else {
            console.log('Usuario admin ya existe');
        }
    });
});

app.use(express.static(path.join(__dirname, '../')));

app.post('/api/auth/registro', (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    console.log('Datos recibidos en registro:', req.body); // 👈
    const sql = 'INSERT INTO usuarios (nombre, correo, contrasenia) VALUES (?, ?, ?)';
    db.query(sql, [nombre, correo, contraseña], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        res.json({ mensaje: 'Usuario registrado exitosamente' });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { correo, contraseña } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasenia = ?';
    db.query(sql, [correo, contraseña], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al iniciar sesión' });

        if (results.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        res.json({ mensaje: 'Inicio de sesión exitoso', usuario: results[0] });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});