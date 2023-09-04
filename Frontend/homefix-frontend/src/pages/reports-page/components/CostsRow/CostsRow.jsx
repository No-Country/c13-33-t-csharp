import './CostsRow.css'

const CostsRow = ({ product, cost, revenue }) => {
	return (
		<tr className="costsrow-table-row">
			<td>{product}</td>
			<td>{'$' + cost}</td>
			<td>{revenue + '%'}</td>
			<td>{'$' + (cost * revenue) / 100}</td>
			<td>{'$' + (cost * (revenue + 100)) / 100}</td>
		</tr>
	)
}

export default CostsRow
