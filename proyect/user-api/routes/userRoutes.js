const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Importa tu modelo de usuario
const bcrypt = require('bcryptjs'); // Asegúrate de tener bcryptjs instalado
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// Rutas para la API de usuarios

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Obtener un usuario por ID
router.get('/:id', getUserById);

// Crear un nuevo usuario
router.post('/', createUser);

// Actualizar un usuario existente por ID
router.put('/:id', updateUser);

// Eliminar un usuario por ID
router.delete('/:id', deleteUser);

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) { // Usar bcrypt para comparar contraseñas
            res.status(200).json(user);
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
