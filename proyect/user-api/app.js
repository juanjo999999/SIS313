const express = require('express');
const path = require('path');
const sequelize = require('./config/database');  // Conexión a la base de datos
const userRoutes = require('./routes/userRoutes');  // Rutas de usuarios
const productRoutes = require('./routes/productRoutes');  // Rutas de productos
const categoryRoutes = require('./routes/categoryRoutes');  // Rutas de categorías

const app = express();

// Middleware para que Express pueda manejar JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las rutas
app.use('/users', userRoutes);  // Rutas para usuarios
app.use('/products', productRoutes);  // Rutas para productos
app.use('/categories', categoryRoutes);  // Rutas para categorías

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log('Error synchronizing database:', err));

// Iniciar servidor
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
