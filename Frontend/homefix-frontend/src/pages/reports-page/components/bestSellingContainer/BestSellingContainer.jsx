import './BestSellingContainer.css'
import placeHolderImage from '../../../../assets/image/lampara.png'
import bestSellingCrown from '../../../../assets/image/fluent_crown-20-filled.svg'

const BestSellingContainer = () => {
	return (
		<div className="reports-best-selling-container">
			<div className="reports-best-selling-images-container">
				<div className="reports-best-selling-product-image-container">
					<img
						className="reposts-best-selling-product-image"
						src={placeHolderImage}
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
				<p className="reports-best-selling-product-name">Lampara colgante</p>
				<p className="reports-best-selling-product-quantity">
					15 unidades vendidas
				</p>
			</div>
		</div>
	)
}

export default BestSellingContainer
