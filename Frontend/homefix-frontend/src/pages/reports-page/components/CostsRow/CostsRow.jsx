import './CostsRow.css'

const CostsRow = ({ product, price, revenue, slide }) => {
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
				{'$' + Math.round(price / (revenue * 0.06))}
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
				{'$' + Math.round((price * revenue) / (100 + revenue))}
			</td>
			<td
				className={
					slide === '3' || slide === '0' ? 'costsrow-show' : 'costsrow-hide'
				}
			>
				{'$' + price}
			</td>
		</tr>
	)
}

export default CostsRow
