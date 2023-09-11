import { useSelector } from 'react-redux'
import CostsRow from '../CostsRow/CostsRow'
import './CostsContainer.css'

const CostsContainer = () => {
	const monthSales = useSelector(state => state.monthSales)

	return (
		<>
			<div className="reports-costs-container">
				<h3 className="reports-costs-title">Costos</h3>
				<hr />
				<table className="reports-costs-table">
					<thead>
						<tr className="reports-costs-table-header">
							<th>Producto</th>
							<th>Costo</th>
							<th>Margen de ganancia (%)</th>
							<th>Margen de ganancia ($)</th>
							<th>Precio</th>
						</tr>
					</thead>
					<tbody>
						{monthSales.map(d => {
							return (
								<CostsRow
									key={d.articuloId}
									product={d.nombre}
									price={d.precio_unitario}
									revenue={20}
								/>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* CAROUSEL */}

			<div
				id="carouselCosts"
				className="costs-carousel carousel carousel-dark slide"
			>
				<h3 className="reports-costs-title">Costos</h3>
				<hr />
				<div className="costs-carousel-indicators carousel-indicators">
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
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div className="carousel-inner">
					<div className="costs-carousel-item carousel-item active">
						<table className="reports-costs-table">
							<thead>
								<tr className="reports-costs-table-header">
									<th>Producto</th>
									<th>Costo</th>
								</tr>
							</thead>
							<tbody>
								{monthSales.map(d => {
									return (
										<CostsRow
											key={d.articuloId}
											product={d.nombre}
											price={d.precio_unitario}
											revenue={20}
											slide="1"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
					<div className="costs-carousel-item carousel-item">
						<table className="reports-costs-table">
							<thead>
								<tr className="reports-costs-table-header">
									<th>Margen de ganancia (%)</th>
									<th>Margen de ganancia ($)</th>
								</tr>
							</thead>
							<tbody>
								{monthSales.map(d => {
									return (
										<CostsRow
											key={d.articuloId}
											product={d.nombre}
											price={d.precio_unitario}
											revenue={20}
											slide="2"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
					<div className="costs-carousel-item carousel-item">
						<table className="reports-costs-table">
							<thead>
								<tr className="reports-costs-table-header">
									<th>Precio</th>
								</tr>
							</thead>
							<tbody>
								{monthSales.map(d => {
									return (
										<CostsRow
											key={d.articuloId}
											product={d.nombre}
											price={d.precio_unitario}
											revenue={20}
											slide="3"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<button
					className="costs-carousel-control-prev carousel-control-prev"
					type="button"
					data-bs-target="#carouselCosts"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="costs-carousel-control-next carousel-control-next"
					type="button"
					data-bs-target="#carouselCosts"
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

export default CostsContainer
