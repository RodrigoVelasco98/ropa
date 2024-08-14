document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.querySelector("#product-list");

    // Hacer la solicitud a la API
    fetch("https://8xg749st-3000.usw3.devtunnels.ms/ropa")
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

                                <div class="modal product-modal fade" id="product-modal">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i class="tf-ion-close"></i>
                </button>
                <div class="modal-dialog " role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-8 col-sm-6 col-xs-12">
                                    <div class="modal-image">
                                        <img class="img-responsive" src="${product.imagen}" alt="product-img" />
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-6 col-xs-12">
                                    <div class="product-short-details">
                                        <h2 class="product-title" id="modal-title">${product.nombre}</h2>
                                        <p class="product-price" id="modal-price">${product.precio}</p>
                                        <p class="product-short-description" id="modal-description">${product.descripcion}</p>
                                        <a href="cart.html" class="btn btn-main">Add To Cart</a>
                                        <a href="product-single.html" class="btn btn-transparent">View Product Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;

                // Agregar el producto al contenedor
                productsContainer.appendChild(productItem);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
