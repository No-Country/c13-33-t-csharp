import './SalesRow.css'

const SalesRow = ({ product, price, quantity }) => {
	return (
		<tr className="salesrow-table-row">
			<td>{product}</td>
			<td>{'$' + price}</td>
			<td>{quantity}</td>
			<td>{'$' + price * quantity}</td>
		</tr>
	)
}

export default SalesRow
