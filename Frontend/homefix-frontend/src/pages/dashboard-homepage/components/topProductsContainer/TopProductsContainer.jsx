import React, { useEffect } from 'react'
import './TopProductsContainer.css'
import { useDispatch, useSelector } from 'react-redux'
import noImage from '../../../../assets/image/icons8-sin-imágen-100.png'
import { loadTopSales } from '../../../../reducers/topSalesReducer'

export default function TopProductsContainer() {
	const topSales = useSelector(state => state.topSales)
	const token = useSelector(state => state.token)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTopSales(token))
		//eslint-disable-next-line
	}, [])

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
								<img
									src={!product.imagenes ? noImage : product.imagenes}
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
