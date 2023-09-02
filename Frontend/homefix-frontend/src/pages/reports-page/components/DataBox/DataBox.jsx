import './DataBox.css'

const DataBox = ({ title, number, numberFormat }) => {
	return (
		<div className="databox-container">
			<h4 className="databox-title">{title}</h4>
			<hr />
			<p className="databox-data">
				{numberFormat === '$' ? numberFormat + number : number + numberFormat}
			</p>
		</div>
	)
}

export default DataBox
