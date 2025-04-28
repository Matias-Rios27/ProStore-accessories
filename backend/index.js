const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda'
});

const uploadsPath = path.join(__dirname, '..', 'assets', 'uploads');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsPath);
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use('/assets/uploads',express.static(path.join(__dirname, '..', 'assets', 'uploads')));

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la BD:', err);
        return;
    }
    console.log('Conectado a la base de datos');

    db.query('SELECT * FROM usuarios WHERE correo = "admin@admin.com"', (err, results) => {
        if (err) return console.error('Error al verificar admin:', err);

        if (results.length === 0) {
            const usuario = 'admin';
            const correo = 'admin@admin.com';
            const contraseña = 'admin123';


            const insertSql = 'INSERT INTO usuarios (usuario, correo, contrasenia, admin) VALUES (?, ?, ?, true)';
            db.query(insertSql, [usuario, correo, contraseña], (err, result) => {
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
    const { usuario, correo, contraseña } = req.body;
    console.log('Datos recibidos en registro:', req.body);  

    if (!usuario || !correo || !contraseña) {
        console.error('Datos incompletos recibidos:', req.body);
        return res.status(400).json({ error: 'Usuario, correo y contraseña son obligatorios' });
    }

    const sql = 'INSERT INTO usuarios (usuario, correo, contrasenia, admin) VALUES (?, ?, ?, false)';

    db.query(sql, [usuario, correo, contraseña], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario en la base de datos:', err); 
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        
        console.log('Usuario registrado con éxito:', result);  
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

app.get('/api/perfil/:correo', (req, res) => {
    const correo = req.params.correo;
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';

    db.query(sql, [correo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al recuperar los datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(results[0]);  
    });
});

app.put('/api/perfil', upload.single('imagen'), (req, res) => {
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const pais = req.body.pais;
    const ciudad = req.body.ciudad;
    const imagen = req.file ? `assets/uploads/${req.file.filename}` : null;

    if (!correo) {
        return res.status(400).json({ error: 'El correo es obligatorio' });
    }

    let sql = `
        UPDATE usuarios 
        SET usuario = ?, nombre = ?, apellido = ?, telefono = ?, direccion = ?, pais = ?, ciudad = ?
    `;
    const values = [usuario, nombre, apellido, telefono, direccion, pais, ciudad];

    if (imagen) {
        sql += `, imagen = ?`;
        values.push(imagen);
    }

    sql += ` WHERE correo = ?`;
    values.push(correo);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el perfil:', err);
            return res.status(500).json({ error: 'Error al actualizar el perfil' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Perfil actualizado exitosamente' });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});