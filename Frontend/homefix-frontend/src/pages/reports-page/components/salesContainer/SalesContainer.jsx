import SalesRow from '../SalesRow/SalesRow'
import './SalesContainer.css'

const testTableData = [
	{
		id: 1,
		product: 'Destornillador cruz',
		price: '3690',
		quantity: 9,
	},
	{
		id: 2,
		product: 'Lampara colgante',
		price: '40990',
		quantity: 15,
	},
	{
		id: 3,
		product: 'Lampara pie',
		price: '30000',
		quantity: 11,
	},
	{
		id: 4,
		product: 'Martillo carpintero',
		price: '5990',
		quantity: 5,
	},
	{
		id: 5,
		product: 'Puerta con ventanas',
		price: '176000',
		quantity: 5,
	},
]

const SalesContainer = () => {
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
						{testTableData.map(d => {
							return (
								<SalesRow
									key={d.id}
									product={d.product}
									price={d.price}
									quantity={d.quantity}
									slide="0"
								/>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* CAROUSEL */}

			<div id="carouselExample" className="carousel carousel-dark slide">
				<h3 className="reports-sales-title">Ventas</h3>
				<hr />
				<div className="carousel-indicators">
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
					<div className="carousel-item active">
						<table className="reports-sales-table">
							<thead>
								<tr className="reports-sales-table-header">
									<th>Producto</th>
									<th>Precio</th>
								</tr>
							</thead>
							<tbody>
								{testTableData.map(d => {
									return (
										<SalesRow
											key={d.id}
											product={d.product}
											price={d.price}
											quantity={d.quantity}
											slide="1"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
					<div className="carousel-item">
						<table className="reports-sales-table">
							<thead>
								<tr className="reports-sales-table-header">
									<th>Vendidos</th>
									<th>Venta total</th>
								</tr>
							</thead>
							<tbody>
								{testTableData.map(d => {
									return (
										<SalesRow
											key={d.id}
											product={d.product}
											price={d.price}
											quantity={d.quantity}
											slide="2"
										/>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExample"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExample"
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
