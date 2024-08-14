// add-product.js

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const tipo = document.getElementById('tipo').value;
    const imagen = document.getElementById('imagen').files[0];

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('cantidad', cantidad);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('tipo', tipo);
    formData.append('imagen', imagen);

    fetch('http://fsaqhzotnk.loclx.io/agregar', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Producto agregado exitosamente', data);
            // Redirigir a la página de productos u otra página
            window.location.href = 'productos.html';
        } else {
            console.error('Producto agregado exitosamente', data.message);
            // Mostrar mensaje de error al usuario
            alert('Producto agregado exitosamente: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al agregar el producto. Por favor, inténtalo de nuevo más tarde.');
    });
});
