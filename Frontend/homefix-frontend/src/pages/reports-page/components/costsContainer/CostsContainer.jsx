import CostsRow from '../CostsRow/CostsRow'
import './CostsContainer.css'

const CostsContainer = () => {
	const testTableData = [
		{
			id: 1,
			product: 'Destornillador cruz',
			cost: 2952,
			revenue: 20,
		},
		{
			id: 2,
			product: 'Lampara colgante',
			cost: 31802,
			revenue: 20,
		},
		{
			id: 3,
			product: 'Lampara pie',
			cost: 24000,
			revenue: 20,
		},
		{
			id: 4,
			product: 'Martillo carpintero',
			cost: 4792,
			revenue: 20,
		},
		{
			id: 5,
			product: 'Puerta con ventanas',
			cost: 140800,
			revenue: 20,
		},
	]

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
						{testTableData.map(d => {
							return (
								<CostsRow
									key={d.id}
									product={d.product}
									cost={d.cost}
									revenue={d.revenue}
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
								{testTableData.map(d => {
									return (
										<CostsRow
											key={d.id}
											product={d.product}
											cost={d.cost}
											revenue={d.revenue}
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
								{testTableData.map(d => {
									return (
										<CostsRow
											key={d.id}
											product={d.product}
											cost={d.cost}
											revenue={d.revenue}
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
								{testTableData.map(d => {
									return (
										<CostsRow
											key={d.id}
											product={d.product}
											cost={d.cost}
											revenue={d.revenue}
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
