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
							/>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default SalesContainer
