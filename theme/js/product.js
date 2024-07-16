/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector(".row");

    // Hacer la solicitud a la API
    fetch("http://localhost:3000/ropa")
        .then(response => response.json())
        .then(data => {
            // Iterar sobre los productos recibidos
            data.articulo.forEach(product => {
                // Crear elementos HTML para cada producto
                const productItem = document.createElement("div");
                productItem.classList.add("col-md-4");

                productItem.innerHTML = `
                    <div class="product-item">
                        <div class="product-thumb">
                            <span class="bage">Sale</span>
                            <img class="img-responsive product-image" src="${product.imagen}" alt="product-img" />
                            <div class="preview-meta">
                                <ul>
                                    <li>
                                        <span data-toggle="modal" data-target="#product-modal">
                                            <i class="tf-ion-ios-search-strong"></i>
                                        </span>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="tf-ion-ios-heart"></i></a>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="tf-ion-android-cart"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="product-content">
                            <h4 class="product-title">${product.nombre}</h4>
                            <p class="price">$${product.precio}</p>
                        </div>
                    </div>
                `;

                // Agregar el producto al contenedor
                productsContainer.appendChild(productItem);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
