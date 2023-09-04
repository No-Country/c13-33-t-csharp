import './DataBox.css'

const DataBox = ({ title, number, numberFormat, icon }) => {
	return (
		<div className="databox-container">
			<div
				className="databox-icon-container"
				style={!icon ? { display: 'none' } : { display: 'block' }}
			>
				<img className="databox-icon-image" src={icon} alt="quest icon" />
				<div className="databox-icon-infotext">
					<p className="databox-icon-infotext-paragraph">
						ROS (Return on Sales), es el porcentaje de beneficio en relación con
						las ventas
					</p>
				</div>
			</div>
			<h4 className="databox-title">{title}</h4>
			<hr />
			<p className="databox-data">
				{numberFormat === '$' ? numberFormat + number : number + numberFormat}
			</p>
		</div>
	)
}

export default DataBox
