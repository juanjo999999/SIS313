const Category = require('../models/category');

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    
    // Validación de entrada
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// Actualizar una categoría existente
const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    
    // Validación de entrada
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        await category.update({ name, description });
        res.json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// Eliminar una categoría existente
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
