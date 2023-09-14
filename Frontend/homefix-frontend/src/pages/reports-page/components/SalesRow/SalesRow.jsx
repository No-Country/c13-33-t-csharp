import './SalesRow.css'

const SalesRow = ({ product, price, quantity, slide }) => {
	return (
		<tr className="salesrow-table-row">
			<td
				className={
					slide === '1' || slide === '0' ? 'salesrow-show' : 'salesrow-hide'
				}
			>
				{product}
			</td>
			<td
				className={
					slide === '1' || slide === '0' ? 'salesrow-show' : 'salesrow-hide'
				}
			>
				{'$' + new Intl.NumberFormat().format(price)}
			</td>
			<td
				className={
					slide === '2' || slide === '0' ? 'salesrow-show' : 'salesrow-hide'
				}
			>
				{quantity}
			</td>
			<td
				className={
					slide === '2' || slide === '0' ? 'salesrow-show' : 'salesrow-hide'
				}
			>
				{'$' + new Intl.NumberFormat().format(price * quantity)}
			</td>
		</tr>
	)
}

export default SalesRow
