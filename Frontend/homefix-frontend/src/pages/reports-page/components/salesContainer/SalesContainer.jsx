import { useSelector } from 'react-redux'
import SalesRow from '../SalesRow/SalesRow'
import './SalesContainer.css'

const SalesContainer = () => {
	const monthSales = useSelector(state => state.monthSales)

	return (
		<>
			<div className="reports-sales-container">
				<h3 className="reports-sales-title">Ventas</h3>
				<hr />
				<table className="reports-sales-table">
					<thead>
						<tr className="reports-sales-table-header">
							<th>Producto</th>
							<th>Precio</th>
							<th>Vendidos</th>
							<th>Venta total</th>
						</tr>
					</thead>
					<tbody>
						{monthSales.map(article => {
							return (
								<SalesRow
									key={article.articuloId}
									product={article.nombre}
									price={Math.round(article.precio_unitario)}
									quantity={article.cantidad}
									slide="0"
								/>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* CAROUSEL */}

			<div
				id="carouselSales"
				className="sales-carousel carousel carousel-dark slide"
			>
				<h3 className="reports-sales-title">Ventas</h3>
				<hr />
				<div className="sales-carousel-indicators carousel-indicators">
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
				</div>
				<div className="carousel-inner">
					<div className="sales-carousel-item carousel-item active">
						<table className="reports-sales-table">
							<thead>
								<tr className="reports-sales-table-header">
									<th>Producto</th>
									<th>Precio</th>
								</tr>
							</thead>
							<tbody>
								{monthSales.map(article => {
									return (
										<SalesRow
											key={article.articuloId}
											product={article.nombre}
											price={Math.round(article.precio_unitario)}
											quantity={article.cantidad}
											slide="1"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
					<div className="sales-carousel-item carousel-item">
						<table className="reports-sales-table">
							<thead>
								<tr className="reports-sales-table-header">
									<th>Vendidos</th>
									<th>Venta total</th>
								</tr>
							</thead>
							<tbody>
								{monthSales.map(article => {
									return (
										<SalesRow
											key={article.articuloId}
											product={article.nombre}
											price={Math.round(article.precio_unitario)}
											quantity={article.cantidad}
											slide="2"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<button
					className="sales-carousel-control-prev carousel-control-prev"
					type="button"
					data-bs-target="#carouselSales"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="sales-carousel-control-next carousel-control-next"
					type="button"
					data-bs-target="#carouselSales"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</>
	)
}

export default SalesContainer
