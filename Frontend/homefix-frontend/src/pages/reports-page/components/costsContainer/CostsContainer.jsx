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
		<div className="reports-costs-container">
			<h3 className="reports-costs-title">Ventas</h3>
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
	)
}

export default CostsContainer
