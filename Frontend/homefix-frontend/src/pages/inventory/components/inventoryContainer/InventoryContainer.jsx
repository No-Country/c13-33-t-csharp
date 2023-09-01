import React, { useState, useEffect } from "react";
import "./InventoryContainer.css";
import searchIcon from "../../../../assets/image/searchIcon.png";
import arrowDown from "../../../../assets/image/arrowVector.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import trashIcon from "../../../../assets/image/trash.png";
import closeIcon from "../../../../assets/image/Vector.png";
import boxIcon from "../../../../assets/image/solar_box-bold.png";
import { useSelector } from "react-redux";
import "./InventoryContainerResponsive.css";

export default function InventoryContainer() {
  const allProductsData = useSelector((state) => state.allProductsData);
  const allBrandsData = useSelector((state) => state.allBrandsData);
  const allCategoriesData = useSelector((state) => state.allCategoriesData);
  
  const [detailShow, setDetailShow] = useState(false);
  const [isFiltered, setIsFiltered] = useState(null);
  const [animationShown, setAnimationShown] = useState(0);
  const [rotateAnimation, setRotateAnimation] = useState(180);
  const [stock, setStock] = useState();
  const [editor, setEditor] = useState(false);
  const [isAdministrator, setIsAdministrator] = useState(true);
  const [filteredProductById, setFilteredProductsById] = useState([]);
  const [filteredProductByCategory, setFilteredProductsCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filterSelected, setFilterSelected] = useState("Por Producto")
  const navigate = useNavigate();



  useEffect(() => {
    if (detailShow) {
      setAnimationShown(0);
      setRotateAnimation({ rotate: 180 }, { duration: 0.2 });
    } else {
      setRotateAnimation({ rotate: 0 });
    }
  }, [detailShow]);

  useEffect(() => {
    const productsCopyForName = [...allProductsData];
    const filteredByName = productsCopyForName.sort((a, b) => a.nombre - b.nombre);
    setAllProducts(filteredByName);
  }, [])

  useEffect(() => {
    if(isFiltered === null){
      const productsCopyForProduct = [...allProductsData];
    const filteredByProduct = productsCopyForProduct.sort((a, b) => a.nombre - b.nombre);
    setAllProducts(filteredByProduct)
    }
  }, [])

  useEffect(() => {
    const productsCopyForID = [...allProductsData];
    const filteredById = productsCopyForID.sort((a, b) => a.id - b.id);
    setFilteredProductsById(filteredById);

    const productsCopyForCategory = [...allProductsData];
    const filteredByCategory = productsCopyForCategory.sort((a, b) => a.categoria - b.categoria);
    setFilteredProductsCategory(filteredByCategory);

    // Dependiendo del valor de isFiltered, actualiza allProducts con la lista correcta
    setAllProducts(isFiltered ? filteredById : filteredByCategory);
  }, [isFiltered]);

  const filteredProductsById = (e) => {
    setFilterSelected(e.target.value)
    setIsFiltered(true);
  };

  const filteredProductsByCategory = (e) => {
    setFilterSelected(e.target.value)
    setIsFiltered(false);
  };

  const increaseProductQuantity = (productId) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          // Incrementa la cantidad del producto en 1
          return { ...product, cantidad: product.cantidad + 1 };
        }
        return product;
      })
    );
  };

  const decreaseProductQuantity = (productId) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          // Incrementa la cantidad del producto en 1
          return { ...product, cantidad: product.cantidad - 1 };
        }
        return product;
      })
    );
  };

  return (
    <>
      <div className="inventory-title-search-container pb-3">
        <h3>Inventario</h3>
        {isAdministrator ? (
          <button
            onClick={() => navigate("/add-product")}
            type="button"
            class="btn btn-outline-dark rounded-pill addProduct-button"
          >
            Añadir Producto
          </button>
        ) : (
          <></>
        )}
        <form className="d-flex searchbox" role="search">
          <div className="searchIconBox">
            <img
              className="searchIcon"
              src={searchIcon}
              alt="Search Icon"
            ></img>
          </div>
          <input
            class="form-control rounded-pill icon-placeholder me-2"
            type="search"
            placeholder="Busca un producto"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="inventory-table-container">
        <div className="title-filter-container">
          <h4>Productos</h4>
          <div className="filter">
            <p className="filter-title mt-2 mx-3">Ordenar por:</p>
            <div className="dropdown">
              <button
                className="btn btn-filter btn-outline-dark"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filterSelected}
                <img
                  className="dropdown-arrow"
                  src={arrowDown}
                  alt="arrow down"
                />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button value="ID" className="button-reset  w-50" onClick={(e) => filteredProductsById(e)}>Por ID</button>
                </li>
                <li>
                  <button value="Categoria" className="button-reset mx-2 w-75" onClick={(e)=> filteredProductsByCategory(e)}>
                    Por Categorias
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table className="table-format">
            <thead className="table-title">
              <tr className="sticky-top">
                <th scope="col">Foto</th>
                <th scope="col">Producto</th>
                <th scope="col">Marca</th>
                <th scope="col">ID</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Vendidos</th>
                <th scope="col">Stock</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {allProducts?.map((product, i) => (
                <>
                  <br></br>
                  <tr
                    key={i}
                    className={`accordion-toggle collapsed pt-5`}
                    onClick={() => setDetailShow(!detailShow)}
                    id="accordion1"
                    data-bs-toggle="collapse"
                    data-bs-parent="#accordion1"
                    href={`#collapse${i}`}
                    aria-controls={`collapse${i}`}
                  >
                    <td>
                      <img
                        src="https://img.freepik.com/free-photo/kitchen-front-utensil-nobody-equipment_1303-373.jpg?w=996&t=st=1693353157~exp=1693353757~hmac=21a32e5570de8752b05118bf2b847784616a4b7f559749e673d3341f9274ab6b"
                        alt="Product Icon"
                        className="product-icon"
                      />
                    </td>
                    <td>{product.nombre}</td>
                    <td>{product.marca}</td>
                    <td>{product.id}</td>
                    <td>{product.categoria}</td>
                    <td>${product.precio}</td>
                    <td>{product.cantidad}</td>
                    <td>{product.cantidad}</td>
                    <td>
                      <motion.div animate={rotateAnimation}>
                        <img
                          className="detailArrow"
                          src={arrowDown}
                          alt="down arrow"
                        />
                      </motion.div>
                    </td>
                  </tr>
                  <tr class="hide-table-padding ">
                    <td colspan="9">
                      <div
                        id={`collapse${i}`}
                        class="collapse in p-3 product-details"
                      >
                        <div className="product-image-container">
                          <img
                            className="product-img"
                            src="https://img.freepik.com/free-photo/kitchen-front-utensil-nobody-equipment_1303-373.jpg?w=996&t=st=1693353157~exp=1693353757~hmac=21a32e5570de8752b05118bf2b847784616a4b7f559749e673d3341f9274ab6b"
                            alt="productimage"
                          />
                          {editor ? (
                            // Mostrar este botón cuando editor es true
                            <button
                              onClick={() => setEditor(false)} // Cambiar el valor de editor a false
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#saveModal"
                              class="btn btn-yellow product-detail-button rounded-pill"
                            >
                              Guardar
                            </button>
                          ) : (
                            // Mostrar este botón cuando editor es false
                            <button
                              onClick={() => setEditor(true)} // Cambiar el valor de editor a true
                              type="button"
                              class="btn btn-dark product-detail-button rounded-pill"
                            >
                              Editar
                            </button>
                          )}
                          {editor && isAdministrator ? (
                            <button
                              type="button"
                              class="btn btn-delete mx-auto rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteModal"
                            >
                              Eliminar
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="product-name-container">
                          <p className="product-detail-title">Producto</p>
                          {editor ? (
                            <input
                              className="editable-input"
                              placeholder="Lampara"
                            />
                          ) : (
                            <p className="product-detail-information">
                              {product.nombre}
                            </p>
                          )}
                        </div>
                        <div className="product-measurements-container">
                          <p className="product-detail-title">
                            Ancho x Alto (cm)
                          </p>
                          {editor ? (
                            <input
                              className="editable-input"
                              placeholder="40 x 29"
                            />
                          ) : (
                            <p className="product-detail-information">
                              {product.ancho} x {product.alto}
                            </p>
                          )}
                        </div>
                        <div className="product-ros-container">
                          <p className="product-detail-title">
                            Margen de ganancia
                          </p>
                          {editor && isAdministrator ? (
                            <input
                              className="addProduct-editable-input-yellow rounded-pill"
                              placeholder="20%"
                            />
                          ) : (
                            <p className="product-detail-information ros-information rounded-pill text-center">
                              20%
                            </p>
                          )}
                        </div>
                        <div className="product-description-container">
                          <p className="product-detail-title">Descripcion</p>
                          {editor && isAdministrator ? (
                            <input
                              className="editable-input"
                              placeholder={product.descripcion}
                            />
                          ) : (
                            <p className="product-detail-information">
                              {product.descripcion}
                            </p>
                          )}
                        </div>
                        <div className="product-brand-container">
                          <p className="product-detail-title">Marca</p>
                          {editor && isAdministrator ? (
                            <div className="dropdown">
                              <button
                                className="button-reset btn-filter btn-outline-dark"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {product.marca}
                                <img
                                  className="dropdown-arrow"
                                  src={arrowDown}
                                  alt="arrow down"
                                />
                              </button>
                              <ul className="dropdown-menu">
                                {allBrandsData.map((brand, i) => (
                                  <li key={i}>
                                    <a className="dropdown-item" href="#">
                                      {brand.nombre}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="product-detail-information">
                              {product.marca}
                            </p>
                          )}
                        </div>
                        <div className="product-weight-container">
                          <p className="product-detail-title">Peso</p>
                          {editor ? (
                            <input
                              className="editable-input"
                              placeholder={product.peso}
                            />
                          ) : (
                            <p className="product-detail-information">
                              {product.peso}
                            </p>
                          )}
                        </div>
                        <div className="product-cost-container">
                          <p className="product-detail-title">Costo</p>
                          {editor && isAdministrator ? (
                            <input
                              className="editable-input"
                              placeholder={`$${product.costo}`}
                            />
                          ) : (
                            <p className="product-detail-information">
                              ${product.costo}
                            </p>
                          )}
                        </div>
                        <div className="product-id-container">
                          <p className="product-detail-title">ID</p>
                          <p className="product-detail-information">
                            {product.id}
                          </p>
                        </div>
                        <div className="product-sold-container">
                          <p className="product-detail-title">Vendidos</p>
                          <p className="product-detail-information">9</p>
                        </div>
                        <div className="product-price-container">
                          <p className="product-detail-title">Precio</p>
                          {editor && isAdministrator ? (
                            <input
                              className="editable-input"
                              placeholder={`$${product.precio}`}
                            />
                          ) : (
                            <p className="product-detail-information">
                              ${product.precio}
                            </p>
                          )}
                        </div>
                        <div className="product-category-container">
                          <p className="product-detail-title ">
                            Categoria &gt; subcategoria
                          </p>
                          <p className="product-detail-information">
                            {editor ? (
                              <div className="dropdown">
                                <button
                                  className="button-reset btn-filter btn-outline-dark"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {product.categoria}
                                  <img
                                    className="dropdown-arrow"
                                    src={arrowDown}
                                    alt="arrow down"
                                  />
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      categoria
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      categoria
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <p>{product.categoria}</p>
                            )}
                          </p>
                        </div>
                        <div className="product-stock-container">
                          <div className="product-stock">
                            <p className="product-detail-title mt-3">
                              Stock actual
                            </p>
                            <p className="product-detail-information">
                            {stock ? stock : product.cantidad}
                            </p>
                            {editor && isAdministrator ? (
                              <div className="stock-box">
                                <button
                                  type="button"
                                  class="btn btn-outline-dark button-stock-minus"
                                  onClick={() => decreaseProductQuantity(product.id)}
                                >
                                  <p className="button-sign my-3">-</p>
                                </button>
                                <p className="product-detail-information stock-number">
                                  {stock ? stock : product.cantidad}
                                </p>
                                <button
                                  type="button"
                                  class="btn btn-outline-dark button-stock-plus"
                                  onClick={() => increaseProductQuantity(product.id)}
                                >
                                  <p className="button-sign my-3">+</p>
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="product-modification">
                            <p className="product-detail-title">
                              Ultima modificacion
                            </p>
                            <p>02/07/2023 17:30</p>
                            <p className="product-detail-information">
                              {product.usuarioUltimaModificacion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal window delete */}
      <div
        class="modal fade"
        id="deleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close-modal rounded-circle"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img className="closeimg" src={closeIcon} alt="" />
              </button>
            </div>
            <div class="modal-body">
              <img
                className="trash-icon mb-3"
                src={trashIcon}
                alt="Borrar Producto"
              />
              <h1 class="modal-delete-title text-center">Eliminar Producto</h1>
              <p className="text-center text-modal">
                ¿Esta seguro que desea eliminar el producto 
                del inventario?
              </p>
            </div>
            <div class="text-center modal-button-box">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Si, eliminar producto
              </button>
              <button
                type="button"
                class="btn btn-outline-dark mt-3 mb-3"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal window delete */}

      {/* modal window save */}
      <div
        class="modal fade"
        id="saveModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close-modal rounded-circle"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img className="closeimg" src={closeIcon} alt="" />
              </button>
            </div>
            <div class="modal-body">
              <img className="trash-icon" src={boxIcon} alt="Borrar Producto" />
              <h1 class="modal-delete-title text-center">
                Haz modificado este producto
              </h1>
              {stock !== 0 ? (
                <p className="text-center text-modal">
                  La cantidad disponible para este producto ha sido actualizada
                  a 30 productos en stock
                </p>
              ) : (
                <></>
              )}
              <p className="text-center text-modal">
                ¿Desea confirmar el cambio en {"product.nombre"}?
              </p>
            </div>
            <div class="text-center modal-button-box">
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Si, confirmo
              </button>
              <button
                type="button"
                class="btn btn-outline-dark mt-3 mb-3"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal window save */}
    </>
  );
}
