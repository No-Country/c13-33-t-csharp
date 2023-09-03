import SalesRow from '../SalesRow/SalesRow'
import './SalesContainer.css'

const testTableData = [
	{
		product: 'Destornillador cruz',
		price: '3690',
		quantity: 9,
	},
	{
		product: 'Lampara colgante',
		price: '40990',
		quantity: 15,
	},
	{
		product: 'Lampara pie',
		price: '30000',
		quantity: 11,
	},
	{
		product: 'Martillo carpintero',
		price: '5990',
		quantity: 5,
	},
	{
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
				<tr className="reports-sales-table-header">
					<th>Producto</th>
					<th>Precio</th>
					<th>Vendidos</th>
					<th>Venta total</th>
				</tr>
				{testTableData.map(d => {
					return (
						<SalesRow
							product={d.product}
							price={d.price}
							quantity={d.quantity}
						/>
					)
				})}
			</table>
		</div>
	)
}

export default SalesContainer
