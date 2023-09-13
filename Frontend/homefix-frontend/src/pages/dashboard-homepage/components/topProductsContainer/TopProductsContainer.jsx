import React, { useEffect, useState } from 'react'
import './TopProductsContainer.css'
import { useSelector } from 'react-redux'
import noImage from '../../../../assets/image/icons8-sin-imágen-100.png'

export default function TopProductsContainer() {
	const [topSales, setTopSales] = useState([])
	const monthSales = useSelector(state => state.monthSales)

	useEffect(() => {
		if (monthSales.length > 0) {
			let dashboardDataCopy = [...monthSales]
			dashboardDataCopy = dashboardDataCopy.sort(
				(a, b) => b.cantidad - a.cantidad
			)
			setTopSales(() => {
				return dashboardDataCopy.slice(0, 3)
			})
		}
	}, [monthSales])

	if (topSales.length === 0) {
		return
	}

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
				{topSales.map((product, i) => {
					return (
						<button
							key={product.articuloId}
							className={'top-products-button top-products-button' + [i + 1]}
						>
							<div className={'product-descr product' + [i + 1] + '-descr'}>
								<img
									src={
										!product.hasOwnProperty('imagen') ? noImage : product.imagen
									}
									alt="best sellers"
								/>
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
