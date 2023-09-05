import './SalesRow.css'

const SalesRow = ({ product, price, quantity, slide }) => {
	return (
		<tr className="salesrow-table-row">
			<td className={slide === '1' || slide === '0' ? 'show' : 'hide'}>
				{product}
			</td>
			<td className={slide === '1' || slide === '0' ? 'show' : 'hide'}>
				{'$' + price}
			</td>
			<td className={slide === '2' || slide === '0' ? 'show' : 'hide'}>
				{quantity}
			</td>
			<td className={slide === '2' || slide === '0' ? 'show' : 'hide'}>
				{'$' + price * quantity}
			</td>
		</tr>
	)
}

export default SalesRow
