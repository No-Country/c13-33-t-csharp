import './BestSellingContainer.css'
import placeHolderImage from '../../../../assets/image/sinImagen.png'
import bestSellingCrown from '../../../../assets/image/fluent_crown-20-filled.svg'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const BestSellingContainer = () => {
	const monthSales = useSelector(state => state.monthSales)
	const [bestSeller, setBestSeller] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setBestSeller(() => {
			const monthSalesCopy = [...monthSales]
			return monthSalesCopy.reduce(
				(prev, curr) => (prev.cantidad > curr.cantidad ? prev : curr),
				0
			)
		})
		setLoading(false)
	}, [monthSales])

	if (loading) {
		return
	}

	return (
		<div className="reports-best-selling-container">
			<div className="reports-best-selling-images-container">
				<div className="reports-best-selling-product-image-container">
					<img
						className="reposts-best-selling-product-image"
						src={
							bestSeller.hasOwnProperty('imagen')
								? bestSeller.imagen
								: placeHolderImage
						}
						alt="best selling product"
					/>
				</div>
				<div className="reports-best-selling-crown-container">
					<img
						className="reports-best-selling-crown-image"
						src={bestSellingCrown}
						alt="best selling crown"
					/>
				</div>
			</div>
			<div className="reports-best-selling-texts-container">
				<h3 className="reports-best-selling-title">Producto más vendido</h3>
				<p className="reports-best-selling-product-name">{bestSeller.nombre}</p>
				<p className="reports-best-selling-product-quantity">
					{bestSeller.cantidad} unidades vendidas
				</p>
			</div>
		</div>
	)
}

export default BestSellingContainer
