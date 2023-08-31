import React from "react";
import "./AddProductContainer.css";
import arrowDown from "../../../../assets/image/arrowVector.png";
import cameraIcon from "../../../../assets/image/camera-solid.png";
import imageIcon from "../../../../assets/image/bi_image.png";
import { useNavigate } from "react-router-dom";

export default function AddProductContainer() {
    const navigate = useNavigate();
  return (
    <>
      <div className="add-product-title-container">
        <div className="add-product-title">
          <h2 className="text-center">Inventario - Anadir Producto</h2>
        </div>
        <div className="add-product-saveButton">
          <button
            onClick={() => navigate("/inventory")}  type="button" class="btn btn-outline-dark rounded-pill">
            Cancelar
          </button>
          <button 
            onClick={() => navigate("/inventory")} type="button" class="btn btn-dark rounded-pill">
            Guardar
          </button>
        </div>
      </div>
      <div className="add-product-info-container">
        <div className="addProduct-info-title">
          <h2>Informacion del Producto</h2>
        </div>
        <div className="addProduct-info-img">
          <div className="addProduct-image-circle rounded-circle">
            <div className="pictureIcon">
              <img src={imageIcon} alt="" />
            </div>
            <div className="addProduct-semiCirlce-wrapper">
              <label>
                <input type="file" hidden />
                <img src={cameraIcon} alt="" />
              </label>
            </div>
          </div>
        </div>
        <div className="addProduct-info-name">
          <p>Producto</p>
          <input
            className="addProduct-editable-input"
            placeholder="Nombre del Producto"
          />
        </div>
        <div className="addProduct-info-id">
          <p>ID</p>
          <input className="addProduct-editable-input" placeholder="ID" />
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
              Abitare
              <img
                className="dropdown-arrow"
                src={arrowDown}
                alt="arrow down"
              />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Marca
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  marca
                </a>
              </li>
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
              categoria
              <img
                className="dropdown-arrow"
                src={arrowDown}
                alt="arrow down"
              />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Por ID
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Por Categorias
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="add-product-char-container">
        <div className="char-title">
          <h2>Caracteristicas del Producto</h2>
        </div>
        <div className="char">
          <p>Ancho X Alto (cm)</p>
          <input
            className="addProduct-editable-input"
            placeholder="Medidas del Producto"
          />
          <p>Peso (kg)</p>
          <input
            className="addProduct-editable-input"
            placeholder="Peso del Producto"
          />
          <p>Descripcion</p>
          <input
            className="addProduct-editable-input"
            placeholder="Descripcion del Producto"
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
              //onClick={() => setStock(stock - 1)}
              type="button"
              class="btn btn-outline-dark button-stock-minus"
            >
              <p className="button-sign my-3">-</p>
            </button>
            <p className="product-detail-information my-auto addProduct-stock">
              {/*stock*/}20
            </p>
            <button
              //onClick={() => setStock(stock + 1)}
              type="button"
              class="btn btn-outline-dark button-stock-plus"
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
            <input className="addProduct-editable-input" placeholder="$" />
          </div>
          <div>
            <p>Margen de Ganancia</p>
            <input
              className="addProduct-editable-input-yellow rounded-pill"
              placeholder="20%"
            />
          </div>
          <div>
            <p>Precio</p>
            <input className="addProduct-editable-input" placeholder="$" />
          </div>
        </div>
      </div>
    </>
  );
}
