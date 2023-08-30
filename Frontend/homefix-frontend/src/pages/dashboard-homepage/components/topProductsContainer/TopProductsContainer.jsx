import React from 'react'
import './TopProductsContainer.css'
import { useSelector } from 'react-redux'

export default function TopProductsContainer() {
	const topSales = useSelector(state => state.topSales)
	const topSalesCopy = [...topSales]
	const topSalesOrderedSliced = topSalesCopy
		.sort((a, b) => b.cantidad - a.cantidad)
		.slice(0, 3)

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
				{topSalesOrderedSliced.map((product, i) => {
					return (
						<button
							key={product.articuloId}
							className={'top-products-button top-products-button' + [i + 1]}
						>
							<div className={'product-descr product' + [i + 1] + '-descr'}>
								<img src="https://placehold.co/42x42.png" alt="best sellers" />
								<span>{product.nombre}</span>
							</div>
							<div
								className={'product-sales-data product' + [i + 1] + '-sales'}
							>
								{product.cantidad}
							</div>
						</button>
					)
				})}
			</div>
		</div>
	)
}
