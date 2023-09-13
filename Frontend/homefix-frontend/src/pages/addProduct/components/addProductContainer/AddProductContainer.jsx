import React, { useState } from "react";
import "./AddProductContainer.css";
import arrowDown from "../../../../assets/image/arrowVector.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../../services/createProduct";
import noProductImage from "../../../../assets/image/noProduct-image.png";
import "./AddProductContainerResponsive.css";
import closeToastButtonGreen from "../../../../assets/image/closeGreen.png";
import checkGreen from "../../../../assets/image/checkGreen.png";
import closeToastButton from "../../../../assets/image/closeButton.png";

export default function AddProductContainer(setNewProductAdded) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [changeImage, setChangeImage] = useState();
  const [isProductSaved, setIsProductSaved] = useState(false);
  const { format } = require("date-fns");
  const [inputValues, setInputValues] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    cantidad: "",
    cantidadMinima: "",
    costo: "",
    precio: "",
    peso: "",
    alto: "",
    ancho: "",
    imagen: "",
    marcaId: "",
    marca: "",
    categoriaId: "",
    categoria: "",
    subcategoria: "",
    updatedAt: "",
    usuarioUltimaModificacion: "",
  });
  const allBrandsData = useSelector((state) => state.allBrandsData);
  const allCategoriesData = useSelector((state) => state.allCategoriesData);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const newDate = new Date();
  const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const selectCategory = (e, category) => {
    e.preventDefault();
    setCategorySelect(category);
  };

  const selectBrand = (e, brand) => {
    e.preventDefault();
    setBrandSelect(brand);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImage(file);
        setChangeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      marca: brandSelect.nombre,
      marcaId: brandSelect.id,
      cantidad: stock,
      categoria: categorySelect.categoria,
      categoriaId: categorySelect.id,
      imagen: productImage,
      usuarioUltimaModificacion: user.userName,
      updatedAt: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", inputValues.id);
    formData.append("nombre", inputValues.nombre);
    formData.append("descripcion", inputValues.descripcion);
    formData.append("cantidad", stock);
    formData.append("cantidadMinima", "5");
    formData.append("costo", inputValues.costo);
    formData.append("precio", inputValues.precio);
    formData.append("peso", inputValues.peso);
    formData.append("alto", inputValues.alto);
    formData.append("ancho", inputValues.ancho);
    formData.append("imagen", productImage);
    formData.append("marcaid", brandSelect.id);
    formData.append("marca", brandSelect.nombre);
    formData.append("categoriaId", categorySelect.id);
    formData.append("categoria", categorySelect.categoria);
    formData.append("subcategoria", categorySelect.subcategoria);
    formData.append("updatedAt", formattedDate);
    formData.append("usuarioUltimaModificacion", user.userName);
    console.log(formData);
    try {
      if (formData) {
        await dispatch(createProduct(formData, token));
		setIsProductSaved(true);
        setTimeout(() => {
          setIsProductSaved(false);
        }, 2000);
      }
    } catch (error) {
      setIsProductSaved(null);
      setTimeout(() => {
        setIsProductSaved(false);
      }, 2000);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="add-product-title-container pb-4">
        <div className="add-product-title">
          <h2 className="text-center">Inventario &gt; Añadir Producto</h2>
        </div>
        <div className="add-product-saveButton">
          {isProductSaved ? (
            <div className="searchBox">
              <div className="update-alert">
                <div className="toast-pointer-update">
                  <br />
                </div>
                <img className="checkIconAlert mx-3" src={checkGreen} alt="" />
                <p className="text-center my-auto w-100 text-toast">
                  Se ha agregado un nuevo producto
                </p>
                <button
                  onClick={() => setIsProductSaved(false)}
                  type="button"
                  className="mx-3 button-reset"
                  aria-label="Close"
                >
                  <img
                    className="w-25"
                    src={closeToastButtonGreen}
                    alt="Close Button"
                  />
                </button>
              </div>
            </div>
          ) : isProductSaved === null ? (
            <div className="searchBox">
              <div className="delete-alert">
                <div className="toast-pointer-delete">
                  <br />
                </div>
                <p className="text-center mx-3 my-auto text-toast">
                  Error al guardar el producto
                </p>
                <button
                  onClick={() => setIsProductSaved(false)}
                  type="button"
                  className="mx-3 button-reset"
                  aria-label="Close"
                >
                  <img
                    className="closeRed"
                    src={closeToastButton}
                    alt="Close Button"
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/inventory")}
                type="button"
                className="btn btn-outline-dark rounded-pill"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-dark rounded-pill"
              >
                Guardar
              </button>
            </>
          )}
        </div>
      </div>
      <div className="add-product-info-container">
        <div className="addProduct-info-title">
          <h2>Información del Producto</h2>
        </div>
        <div className="addProduct-info-img">
          {changeImage ? (
            <div className="addProduct-image-circle circular-image-container imgProduct-container">
              <img
                className="circular-image"
                src={changeImage}
                alt="Imagen del producto"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          ) : (
            <div className="addProduct-image-circle">
              <label className="circular-image-container">
                <img
                  className="circular-image"
                  src={noProductImage}
                  alt=""
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <input
                  name="imagen"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>
        <div className="addProduct-info-name">
          <p>Producto</p>
          <input
            name="nombre"
            className="addProduct-editable-input"
            placeholder="Nombre del Producto"
            value={inputValues.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="addProduct-info-id"></div>
        <div className="addProduct-info-brand">
          <p>Marca</p>
          <div className="dropdown">
            <button
              className="button-reset btn-filter btn-outline-dark"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <input
                name="marca"
                className="addProduct-editable-input"
                placeholder={brandSelect.nombre}
                value={inputValues.marca}
                onChange={handleInputChange}
				disabled
              />
              <img
                className="dropdown-arrow"
                src={arrowDown}
                alt="arrow down"
              />
            </button>
            <ul className="dropdown-menu">
              {allBrandsData.map((brand, i) => (
                <li className="  z-index-3 bg-white" key={i}>
                  <button
                    value={brand}
                    className="dropdown-item  z-index-correction bg-white"
                    onClick={(e) => selectBrand(e, brand)}
                  >
                    {brand.nombre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="addProduct-info-category">
          <p>Categoria &gt; subcategoria</p>
          <div className="dropdown">
            <button
              className="button-reset btn-filter btn-outline-dark"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <input
                name="categoria"
                className="addProduct-editable-input"
                placeholder={categorySelect.categoria}
                value={inputValues.categoria}
                onChange={handleInputChange}
				disabled
              />
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
                  .some((item) => item.categoria === category.categoria);
                if (!categoryExists) {
                  return (
                    <li key={i}>
                      <button
                        value={category.categoria}
                        className="dropdown-item bg-white addProduct-info-category"
                        onClick={(e) => selectCategory(e, category)}
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
        </div>
      </div>
      <div className="add-product-char-container">
        <div className="char-title">
          <h2>Caracteristicas del Producto</h2>
        </div>
        <div className="char">
          <div className="messure">
            <p>Ancho (cm)</p>
            <input
              name="ancho"
              className="addProduct-editable-input"
              placeholder="Medidas Ancho"
              value={inputValues.ancho}
              onChange={handleInputChange}
            />
            <p>Alto (cm)</p>
            <input
              name="alto"
              className="addProduct-editable-input"
              placeholder="Medidas Alto"
              value={inputValues.alto}
              onChange={handleInputChange}
            />
          </div>
          <p>Peso (kg)</p>
          <input
            name="peso"
            className="addProduct-editable-input"
            placeholder="Peso del Producto"
            value={inputValues.peso}
            onChange={handleInputChange}
          />
          <p>Descripcion</p>
          <input
            name="descripcion"
            className="addProduct-editable-input"
            placeholder="Descripcion del Producto"
            value={inputValues.descripcion}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="add-product-stock-container">
        <div className="addProduct-stock-title">
          <h2>Stock del Producto</h2>
        </div>
        <div className="addProduct-buttons">
          <p>Stock</p>
          <div className="addProduct-buttons-container">
            <button
              onClick={() => {
                if (stock >= 1) {
                  setStock(stock - 1);
                }
              }}
              type="button"
              className="btn btn-outline-dark button-stock-minus"
            >
              <p className="button-sign my-3">-</p>
            </button>
            <input
              name="cantidad"
              className="product-detail-information my-auto addProduct-stock text-center"
              value={stock}
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                if (stock >= 0) {
                  setStock(stock + 1);
                }
              }}
              type="button"
              className="btn btn-outline-dark button-stock-plus"
            >
              <p className="button-sign my-3">+</p>
            </button>
          </div>
        </div>
      </div>
      <div className="add-product-price-container">
        <div className="addProduct-price-title">
          <h2>Precio del Producto</h2>
        </div>
        <div className="addProduct-price-input">
          <div>
            <p>Costo</p>
            <input
              name="costo"
              className="addProduct-editable-input"
              placeholder="$"
              value={inputValues.costo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Margen de Ganancia</p>
            <input
              name="margen"
              className="addProduct-editable-input-yellow rounded-pill"
              placeholder="20%"
              value="20"
            />
          </div>
          <div>
            <p>Precio</p>
            <input
              name="precio"
              className="addProduct-editable-input"
              placeholder="$"
			  value={inputValues.costo * 1.2 || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
