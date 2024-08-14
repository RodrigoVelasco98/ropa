/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector("#product-list");
    const modal = document.getElementById("product-modal");

    if (!productsContainer) {
        console.error("Products container not found");
        return;
    }

    if (!modal) {
        console.error("Modal element not found");
        return;
    }

    console.log("Attempting initialization", new Date());

    // Hacer la solicitud a la API
    fetch("https://8xg749st-3000.usw3.devtunnels.ms/ropa")
        .then(response => response.json())
        .then(data => {
            console.log("Products data fetched:", data);

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
                                        <span data-toggle="modal" data-target="#product-modal" data-id="${product._id}">
                                            <i class="tf-ion-ios-search-strong"></i>
                                        </span>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="tf-ion-ios-heart"></i></a>
                                    </li>
                                    <li>
                                        <a href="#!"><i class="tf-ion-android-cart" data-id="${product._id}"></i></a>
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

            // Agregar manejador de eventos para los iconos del modal y el carrito
            productsContainer.addEventListener("click", function (event) {
                const modalTrigger = event.target.closest("span[data-toggle='modal']");
                if (modalTrigger) {
                    const productId = modalTrigger.getAttribute("data-id");
                    console.log("Modal trigger clicked, product ID:", productId);
                    if (productId) {
                        loadProductDetails(productId);
                    } else {
                        console.error("Product ID not found");
                    }
                }

                const cartTrigger = event.target.closest("i.tf-ion-android-cart");
                if (cartTrigger) {
                    const productId = cartTrigger.getAttribute("data-id");
                    console.log("Add to cart clicked, product ID:", productId);
                    if (productId) {
                        addToCart(productId);
                    } else {
                        console.error("Product ID not found");
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching products:", error));

    function loadProductDetails(productId) {
        console.log("Fetching product details for ID:", productId);
        fetch(`https://8xg749st-3000.usw3.devtunnels.ms/ropaUnidad/${productId}`)
            .then(response => response.json())
            .then(product => {
                console.log("Product details fetched:", product);
                if (modal) {
                    const modalImage = modal.querySelector("#modal-image");
                    const modalTitle = modal.querySelector("#modal-title");
                    const modalPrice = modal.querySelector("#modal-price");
                    const modalDescription = modal.querySelector("#modal-description");

                    if (product.articulo) {
                        if (modalImage) modalImage.src = product.articulo.imagen || "default.jpg";
                        if (modalTitle) modalTitle.textContent = product.articulo.nombre || "Nombre no disponible";
                        if (modalPrice) modalPrice.textContent = `$${product.articulo.precio || 0}`;
                        if (modalDescription) modalDescription.textContent = product.articulo.descripcion || "Descripción no disponible";

                        // Update the "View Product Details" link
                        const viewDetailsLink = modal.querySelector(".btn-transparent");
                        if (viewDetailsLink) {
                            viewDetailsLink.href = `product-single.html?id=${productId}`;
                        }
                    } else {
                        console.error("Product details are missing");
                    }
                } else {
                    console.error("Modal element not found");
                }
            })
            .catch(error => console.error("Error fetching product details:", error));
    }

    function addToCart(productId) {
        fetch(`https://8xg749st-3000.usw3.devtunnels.ms/ropaUnidad/${productId}`)
            .then(response => response.json())
            .then(product => {
                const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
                const productToAdd = {
                    id: product.articulo._id,
                    nombre: product.articulo.nombre,
                    precio: product.articulo.precio,
                    imagen: product.articulo.imagen
                };
                cartItems.push(productToAdd);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                alert("Product added to cart");
            })
            .catch(error => console.error("Error adding product to cart:", error));
    }
});
