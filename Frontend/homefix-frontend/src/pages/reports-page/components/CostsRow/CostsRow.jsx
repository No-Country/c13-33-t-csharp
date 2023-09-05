import './CostsRow.css'

const CostsRow = ({ product, cost, revenue, slide }) => {
	return (
		<tr className="costsrow-table-row">
			<td
				className={
					slide === '1' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{product}
			</td>
			<td
				className={
					slide === '1' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{'$' + cost}
			</td>
			<td
				className={
					slide === '2' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{revenue + '%'}
			</td>
			<td
				className={
					slide === '2' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{'$' + (cost * revenue) / 100}
			</td>
			<td
				className={
					slide === '3' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{'$' + (cost * (revenue + 100)) / 100}
			</td>
		</tr>
	)
}

export default CostsRow
