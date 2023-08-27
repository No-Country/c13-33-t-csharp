import React from "react";
import "./TopProductsContainer.css";

export default function TopProductsContainer() {
  return (
    <div className="top-products-container">
      <div className="top-products-title">Mas Vendidos</div>
      <div className="table-tags">
        <div className="product-name"><h5>Producto</h5></div>
        <div className="product-id"><h5>ID</h5></div>
        <div className="product-price"><h5>Precio</h5></div>
      </div>
      <div className="top-products-list"></div>
    </div>
  );
}
