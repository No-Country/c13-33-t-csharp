import React from 'react'
import './TopProductsContainer.css'

export default function TopProductsContainer() {
	return (
		<div className="top-products-container">
			<div className="top-products-title">Más vendidos</div>
			<div className="table-tags">
				<div className="product-name">
					<h5>Producto</h5>
				</div>
				<div className="product-sales">
					<h5>Cantidad vendida</h5>
				</div>
			</div>
			<div className="top-products-list">
				<button className="top-products-button top-products-button1">
					<div className="product-descr product1-descr">
						<img
							src="https://placehold.co/42x42.png"
							alt="first best seller product"
						/>
						<span>Descripción producto 1</span>
					</div>
					<div className="product-sales-data product1-sales">15</div>
				</button>
				<button className="top-products-button top-products-button2">
					<div className="product-descr product2-descr">
						<img
							src="https://placehold.co/42x42.png"
							alt="second best seller product"
						/>
						<span>Descripción producto 2</span>
					</div>
					<div className="product-sales-data product2-sales">11</div>
				</button>
				<button className="top-products-button top-products-button3">
					<div className="product-descr product3-descr">
						<img
							src="https://placehold.co/42x42.png"
							alt="third best seller product"
						/>
						<span>Descripción producto 3</span>
					</div>
					<div className="product-sales-data product3-sales">10</div>
				</button>
			</div>
		</div>
	)
}
