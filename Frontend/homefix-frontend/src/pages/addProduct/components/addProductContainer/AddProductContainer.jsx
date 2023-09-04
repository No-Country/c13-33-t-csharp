import React, { useState } from "react";
import "./AddProductContainer.css";
import arrowDown from "../../../../assets/image/arrowVector.png";
import cameraIcon from "../../../../assets/image/camera-solid.png";
import imageIcon from "../../../../assets/image/bi_image.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCreateProduct } from "../../../../reducers/allProductsDataReducer";
import createProductService from "../../../../services/createProduct";
import './AddProductContainerResponsive.css'

export default function AddProductContainer() {
  const dispatch = useDispatch();
  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState(null);
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

  console.log(user);
  const newDate = new Date();
  const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const selectCategory = (e,category) => {
	e.preventDefault();
    setCategorySelect(category);
  };

  const selectBrand = (e,brand) => {
	e.preventDefault();
    setBrandSelect(brand);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImage(e.target.result);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
    id: inputValues.id,
    nombre: inputValues.nombre,
    descripcion: inputValues.nombre.descripcion,
    cantidad: stock,
    cantidadMinima: "5",
    costo: inputValues.costo,
    precio: inputValues.precio,
    peso: inputValues.peso,
    alto: inputValues.alto,
    ancho: inputValues.ancho,
    imagen: productImage,
    marcaid: brandSelect.id,
    marca: brandSelect.nombre,
    categoriaId: categorySelect.id,
    categoria: categorySelect.categoria,
    subcategoria: categorySelect.categoria,
    updatedAt: formattedDate,
    usuarioUltimaModificacion: user.userName,
	token: user.token
  }	
  handleDispatch(productData);
}


const handleDispatch = async (productData) => {
  try {
    const newProduct = await createProductService.createProduct(productData)
    dispatch(setCreateProduct(newProduct))
    navigate('/inventory')
  } catch (error) {
    console.log('error');
  }
}

/*  const dispatchdata = async(productData) => {
	try {
		const newProduct = await createProductService.createPrduct({ productData })
		dispatch(setCreateProduct(newProduct))
		navigate('/')
	} catch (error) {
		dispatch(
			error('error')
		)
	}
} */



  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="add-product-title-container" >
        <div className="add-product-title">
          <h2 className="text-center">Inventario - Añadir Producto</h2>
        </div>
        <div className="add-product-saveButton">
          <button
            onClick={() => navigate("/inventory")}
            type="button"
            className="btn btn-outline-dark rounded-pill"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={() => {
              //navigate("/inventory");
              console.log(inputValues);
            }}
            className="btn btn-dark rounded-pill"
          >
            Guardar
          </button>
        </div>
      </div>
      <div className="add-product-info-container">
        <div className="addProduct-info-title">
          <h2>Información del Producto</h2>
        </div>
        <div className="addProduct-info-img">
          {productImage ? (
            <div className="addProduct-image-circle imgProduct-container">
              <img
                className="img-circle"
                src={productImage}
                alt="Imagen del producto"
              />
            </div>
          ) : (
            <div className="addProduct-image-circle rounded-circle">
              <div className="pictureIcon">
                <img src={imageIcon} alt="Icono de imagen" />
              </div>
              <div className="addProduct-semiCirlce-wrapper">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <img src={cameraIcon} alt="Icono de cámara" />
                </label>
              </div>
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
        <div className="addProduct-info-id">
          <p>ID</p>
          <input
            name="id"
            className="addProduct-editable-input"
            placeholder="ID"
            value={inputValues.id}
            onChange={handleInputChange}
          />
        </div>
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
              />
              <img
                className="dropdown-arrow"
                src={arrowDown}
                alt="arrow down"
              />
            </button>
            <ul className="dropdown-menu">
              {allBrandsData.map((brand, i) => (
                <li key={i}>
                  <button
                    value={brand}
                    className="dropdown-item  z-index-3 bg-white"
                    onClick={(e) => selectBrand(e,brand)}
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
              />
              <img
                className="dropdown-arrow"
                src={arrowDown}
                alt="arrow down"
              />
            </button>
            <ul className="dropdown-menu ">
              {allCategoriesData.map((category, i) => (
                <li key={i}>
                  <button
                    value={category}
                    className="dropdown-item z-index-3 bg-white"
                    onClick={(e) => selectCategory(e,category)}
                  >
                    {category.categoria}
                  </button>
                </li>
              ))}
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
              value={inputValues.precio}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
	  </form>
  );
}