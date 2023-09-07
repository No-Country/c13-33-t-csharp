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
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../services/deleteProduct";
import { updateProduct } from "../../../../services/updateProduct";
import { updateAllProductsData } from "../../../../reducers/allProductsDataReducer";
const { format } = require("date-fns");

export default function InventoryContainer() {
  const allProductsData = useSelector((state) => state.allProductsData);
  const allBrandsData = useSelector((state) => state.allBrandsData);
  const allCategoriesData = useSelector((state) => state.allCategoriesData);

  const [detailShow, setDetailShow] = useState(false);
  const [rotateAnimation, setRotateAnimation] = useState(180);
  const [editor, setEditor] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filterSelected, setFilterSelected] = useState("Producto");
  const [searchProduct, setSearchProduct] = useState("");
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [productIdForDelete, setProductIdForDelete] = useState();
  const [editedProduct, setEditedProduct] = useState({});
  const [inputValues, setInputValues] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    costo: "",
    precio: "",
    peso: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (detailShow) {
      setRotateAnimation({ rotate: 180 }, { duration: 0.2 });
    } else {
      setRotateAnimation({ rotate: 0 });
    }
  }, [detailShow]);

  useEffect(() => {
    if (filterSelected === "Producto") {
      const productsCopyForProduct = [...allProductsData];
      const filteredByProduct = productsCopyForProduct.sort((a, b) => {
        if (a.nombre < b.nombre) {
          return -1;
        }
        if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      });
      setAllProducts(filteredByProduct);
    } else if (filterSelected === "ID") {
      const productsCopyForID = [...allProductsData];
      const filteredById = productsCopyForID.sort((a, b) => a.id - b.id);
      setAllProducts(filteredById);
    } else if (filterSelected === "Categoria") {
      const productsCopyForCategory = [...allProductsData];
      const filteredByCategory = productsCopyForCategory.sort((a, b) => {
        if (a.categoria < b.categoria) {
          return -1;
        }
        if (a.categoria > b.categoria) {
          return 1;
        }
        return 0;
      });
      setAllProducts(filteredByCategory);
    }
  }, [filterSelected, allProductsData]);

  const selectCategory = (category) => {
    setCategorySelect(category);
  };

  const selectBrand = (brand) => {
    setBrandSelect(brand);
  };

  const updateProductHandler = (product) => {
    const newDate = new Date();
    const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    const newProduct = {
      ...product,
      nombre: inputValues.nombre,
      descripcion: inputValues.descripcion,
      costo: inputValues.costo,
      precio: inputValues.precio,
      cantidad: newQuantity ? newQuantity : product.cantidad,
      updatedAt: formattedDate,
    };

    setEditedProduct(newProduct);
  };

  const [incDecStock, setIncDecStock] = useState(0);
  const [newQuantity, setNewQuantity] = useState(null);

  const increaseProductQuantity = (productId) => {
    setIncDecStock((prevIncDecStock) => {
      const updatedButtonPlus = prevIncDecStock + 1;
      setNewQuantity(() => {
        const productToUpdate = allProducts.filter((p) => p.id === productId);
        return productToUpdate[0].cantidad + updatedButtonPlus;
      });
      return updatedButtonPlus;
    });
  };

  const decreaseProductQuantity = (productId) => {
    setIncDecStock((prevIncDecStock) => {
      const updatedButtonMinus = prevIncDecStock - 1;
      setNewQuantity(() => {
        const productToUpdate = allProducts.filter((p) => p.id === productId);
        return productToUpdate[0].cantidad + updatedButtonMinus;
      });
      return updatedButtonMinus;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = await updateProduct(editedProduct, token);
    dispatch(updateAllProductsData(updatedProduct));
    navigate("/inventory");
  };

  return (
    <>
      <div className="inventory-title-search-container pb-3">
        <h3>Inventario</h3>
        <button
          onClick={() => navigate("/add-product")}
          type="button"
          className="btn btn-outline-dark rounded-pill addProduct-button"
        >
          Añadir Producto
        </button>
        <form className="d-flex searchbox" role="search">
          <div className="searchIconBox">
            <img
              className="searchIcon"
              src={searchIcon}
              alt="Search Icon"
            ></img>
          </div>
          <input
            className="form-control rounded-pill icon-placeholder me-2"
            type="search"
            placeholder="Busca un producto"
            aria-label="Search"
            onChange={(e) => setSearchProduct(e.target.value)}
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
                  <button
                    className="button-reset  w-50"
                    onClick={() => setFilterSelected("ID")}
                  >
                    Por ID
                  </button>
                </li>
                <li>
                  <button
                    className="button-reset mx-2 w-75"
                    onClick={() => setFilterSelected("Categoria")}
                  >
                    Por Categorías
                  </button>
                </li>
                <li>
                  <button
                    className="button-reset mx-2 w-75"
                    onClick={() => setFilterSelected("Producto")}
                  >
                    Por Producto
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table className="inventory-table table-format">
            <thead className="table-title">
              <tr className="sticky-top">
                <th className="hidden-mobile" scope="col">
                  Foto
                </th>
                <th scope="col">Producto</th>
                <th className="hidden-mobile" scope="col">
                  Marca
                </th>
                <th className="hidden-mobile" scope="col">
                  ID
                </th>
                <th className="hidden-mobile" scope="col">
                  Categoría
                </th>
                <th id="precio" scope="col">
                  Precio
                </th>
                <th scope="col">Vendidos</th>
                <th id="stock" scope="col">
                  Stock
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {allProducts
                .filter((products) =>
                  products.nombre
                    .toLowerCase()
                    .slice(0, searchProduct.length)
                    .includes(searchProduct.toLocaleLowerCase())
                )
                .map((product, i) => (
                  <>
                    <br />
                    <tr
                      key={product.id}
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
                          src={product.imagen}
                          alt="Product Icon"
                          className="product-icon"
                        />
                      </td>
                      <td className="mobile-name">{product.nombre}</td>
                      <td className="hidden-mobile">{product.marca}</td>
                      <td className="hidden-mobile">{product.id}</td>
                      <td className="hidden-mobile">{product.categoria}</td>
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
                    <tr className="hide-table-padding ">
                      <td className="product-details-mobile" colSpan="9">
                        <div
                          id={`collapse${i}`}
                          className="collapse in p-3 product-details"
                        >
                          <div className="product-image-container">
                            <img
                              className="product-img"
                              src={product.imagen}
                              alt="productimage"
                            />
                            {editor ? (
                              <button
                                onClick={() => {
                                  setEditor(false);
                                  updateProductHandler(product);
                                }}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#saveModal"
                                className="btn btn-yellow product-detail-button rounded-pill"
                              >
                                Guardar
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditor(true);
                                }}
                                type="button"
                                className="btn btn-dark product-detail-button rounded-pill"
                              >
                                Editar
                              </button>
                            )}
                            {editor ? (
                              <button
                                type="button"
                                className="product-detail-button btn btn-outline-dark mx-auto rounded-pill"
                                onClick={() => setEditor(false)}
                              >
                                Cancelar
                              </button>
                            ) : (
                              <></>
                            )}
                            {editor ? (
                              <button
                                type="button"
                                className="btn btn-delete mx-auto rounded-pill"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                onClick={() =>
                                  setProductIdForDelete(product.id)
                                }
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
                                name="nombre"
                                className="editable-input"
                                placeholder={product.nombre}
                                onChange={handleInputChange}
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
                            <p className="product-detail-information">
                              {product.ancho} x {product.alto}
                            </p>
                          </div>
                          <div className="product-ros-container">
                            <p className="product-detail-title">
                              Margen de ganancia
                            </p>
                            {editor ? (
                              <input
                                name="Margen Ganancia"
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
                            <p className="product-detail-title">Descripción</p>
                            {editor ? (
                              <input
                                name="descripcion"
                                className="editable-input"
                                placeholder={product.descripcion}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p className="product-detail-information">
                                {product.descripcion}
                              </p>
                            )}
                          </div>
                          <div className="product-brand-container">
                            <p className="product-detail-title">Marca</p>
                            {editor ? (
                              <div className="dropdown">
                                <button
                                  className="button-reset btn-filter btn-outline-dark"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {brandSelect
                                    ? brandSelect.nombre
                                    : product.marca}
                                  <img
                                    className="dropdown-arrow"
                                    src={arrowDown}
                                    alt="arrow down"
                                  />
                                </button>
                                <ul className="dropdown-menu">
                                  {allBrandsData.map((brand, i) => (
                                    <li key={allBrandsData.id}>
                                      <button
                                        value={brand}
                                        className="dropdown-item  z-index-3 bg-white"
                                        onClick={(e) => selectBrand(brand)}
                                      >
                                        {brand.nombre}
                                      </button>
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
                            <p className="product-detail-information">
                              {product.peso}
                            </p>
                          </div>
                          <div className="product-cost-container">
                            <p className="product-detail-title">Costo</p>
                            {editor ? (
                              <input
                                name="costo"
                                className="editable-input"
                                placeholder={`$${product.costo}`}
                                onChange={handleInputChange}
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
                            {editor ? (
                              <input
                                name="precio"
                                className="editable-input"
                                placeholder={`$${product.precio}`}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p className="product-detail-information">
                                ${product.precio}
                              </p>
                            )}
                          </div>
                          <div className="product-category-container">
                            <p className="product-detail-title ">
                              Categoría &gt; subcategoría
                            </p>
                            <div className="product-detail-information">
                              {editor ? (
                                <div className="dropdown">
                                  <button
                                    className="button-reset btn-filter btn-outline-dark"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    {categorySelect
                                      ? categorySelect.categoria
                                      : product.categoria}
                                    <img
                                      className="dropdown-arrow"
                                      src={arrowDown}
                                      alt="arrow down"
                                    />
                                  </button>
                                  <ul className="dropdown-menu">
                                    {allCategoriesData.map((category, i) => {
                                      const categoryExists = allCategoriesData
                                        .slice(0, i)
                                        .some(
                                          (item) =>
                                            item.categoria ===
                                            category.categoria
                                        );

                                      if (!categoryExists) {
                                        return (
                                          <li key={i}>
                                            <button
                                              value={category}
                                              className="dropdown-item z-index-3 bg-white"
                                              onClick={(e) =>
                                                selectCategory(category)
                                              }
                                            >
                                              {category.categoria}
                                            </button>
                                          </li>
                                        );
                                      }
                                      return null;
                                    })}
                                  </ul>
                                </div>
                              ) : (
                                <p>{product.categoria}</p>
                              )}
                            </div>
                          </div>
                          <div className="product-stock-container">
                            <div className="product-stock">
                              <p className="product-detail-title mt-3">
                                Stock actual
                              </p>
                              <p className="product-detail-information">
                                {product.cantidad}
                              </p>
                              {editor ? (
                                <div className="stock-box">
                                  <button
                                    type="button"
                                    className="btn btn-outline-dark button-stock-minus"
                                    onClick={() =>
                                      decreaseProductQuantity(product.id)
                                    }
                                  >
                                    <p className="button-sign my-3">-</p>
                                  </button>
                                  <p className="product-detail-information stock-number">
                                    {product.cantidad + incDecStock}
                                  </p>
                                  <button
                                    type="button"
                                    className="btn btn-outline-dark button-stock-plus"
                                    onClick={() =>
                                      increaseProductQuantity(product.id)
                                    }
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
                                Última modificación
                              </p>
                              <p>
                                {new Date(product.updatedAt).toLocaleDateString(
                                  "es-ar",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
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
        className="modal fade"
        id="deleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close-modal rounded-circle"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img className="closeimg" src={closeIcon} alt="" />
              </button>
            </div>
            <div className="modal-body">
              <img
                className="trash-icon mb-3"
                src={trashIcon}
                alt="Borrar Producto"
              />
              <h1 className="modal-delete-title text-center">
                Eliminar Producto
              </h1>
              <p className="text-center text-modal">
                ¿Está seguro que desea eliminar el producto del inventario?
              </p>
            </div>
            <div className="text-center modal-button-box">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={() =>
                  dispatch(deleteProduct(productIdForDelete, token))
                }
              >
                Sí, eliminar producto
              </button>
              <button
                type="button"
                className="btn btn-outline-dark mt-3 mb-3"
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
        className="modal fade"
        id="saveModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close-modal rounded-circle"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img className="closeimg" src={closeIcon} alt="" />
              </button>
            </div>
            <div className="modal-body">
              <img className="trash-icon" src={boxIcon} alt="Borrar Producto" />
              <h1 className="modal-delete-title text-center">
                Has modificado este producto
              </h1>
              {newQuantity !== 0 ? (
                <p className="text-center text-modal">
                  La cantidad disponible para este producto ha sido actualizada
                </p>
              ) : (
                <></>
              )}
              <p className="text-center text-modal">
                ¿Desea confirmar el cambio?
              </p>
            </div>
            <div className="text-center modal-button-box">
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={(e) => handleSubmit(e)}
              >
                Sí, confirmo
              </button>
              <button
                type="button"
                className="btn btn-outline-dark mt-3 mb-3"
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
