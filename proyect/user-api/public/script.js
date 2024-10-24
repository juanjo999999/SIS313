document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica que ambos campos estén completos
    if (!username || !password) {
        alert('Por favor, completa ambos campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login exitoso');
            // Ocultar el formulario de login y mostrar el menú
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('menu').style.display = 'block';
            loadCategories(); // Carga las categorías si el login es exitoso
        } else {
            const errorData = await response.json();
            alert('Error en el login: ' + errorData.message);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
});

// Lista de categorías (puedes ajustar esto según tu base de datos)
const categories = [
    { id: 1, name: 'iPhone' },
    { id: 2, name: 'Smartphones' },
    { id: 3, name: 'Laptops' },
    { id: 4, name: 'Accesorios' },
    { id: 5, name: 'Televisores' },
    { id: 6, name: 'Audio' }
];

document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    
    // Crear botones para cada categoría
    categories.forEach(category => {
        const button = document.createElement('button');
        button.innerText = category.name;
        button.onclick = () => selectCategory(category);
        categoryList.appendChild(button);
    });
});

async function fetchProductsByCategory(categoryId) {
    const response = await fetch(`http://localhost:3000/products?categoryId=${categoryId}`);
    const products = await response.json();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${product.name}</strong>: ${product.description} - $${product.price}
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productList.appendChild(div);
    });
}

// Función para seleccionar categoría y cargar productos
function selectCategory(category) {
    document.getElementById('selected-category-name').innerText = category.name;
    document.getElementById('product-management').style.display = 'block';
    document.getElementById('product-list').innerHTML = ''; // Limpiar productos al seleccionar categoría
    fetchProductsByCategory(category.id); // Cargar productos de la categoría seleccionada
}

// Función para editar un producto
async function editProduct(productId) {
    const productName = prompt("Introduce el nuevo nombre del producto:");
    const productDescription = prompt("Introduce la nueva descripción del producto:");
    const productPrice = prompt("Introduce el nuevo precio del producto:");
    const productStock = prompt("Introduce el nuevo stock del producto:");

    const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice),
            stock: parseInt(productStock)
        })
    });

    if (response.ok) {
        alert("Producto actualizado correctamente.");
        const selectedCategoryId = categories.find(cat => cat.name === document.getElementById('selected-category-name').innerText).id;
        fetchProductsByCategory(selectedCategoryId); // Recargar productos
    } else {
        alert("Error al actualizar el producto.");
    }
}

// Función para eliminar un producto
async function deleteProduct(productId) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Producto eliminado correctamente.");
            const selectedCategoryId = categories.find(cat => cat.name === document.getElementById('selected-category-name').innerText).id;
            fetchProductsByCategory(selectedCategoryId); // Recargar productos
        } else {
            alert("Error al eliminar el producto.");
        }
    }
}

