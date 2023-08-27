import './DashboardResume.css'

export default function DashboardResume() {
	return (
		<div className="dashboard-resume-container">
			<div className="dashboard-resume-title">
				<h3 className="mt-4 dashboard-title">Visión General</h3>
			</div>
			<div className="total-sales">
				<div className="box-title text-center text-white">
					<h4>Total de Ventas</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">$4.444.444</h3>
				</div>
			</div>
			<div className="total-cost">
				<div className="box-title text-center text-white">
					<h4>Total de Costos</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">$3.444.444</h3>
				</div>
			</div>
			<div className="ros">
				<div className="box-title text-center text-white">
					<h4>ROS</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">20%</h3>
				</div>
			</div>
			<div className="products-sales">
				<div className="box-title text-center text-white">
					<h4>Productos Vendidos</h4>
					<hr className="line" />
				</div>
				<div className="box-number">
					<h3 className="text-white">72</h3>
				</div>
			</div>
		</div>
	)
}
