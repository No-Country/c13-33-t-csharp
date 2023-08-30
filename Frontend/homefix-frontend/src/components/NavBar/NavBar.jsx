import './NavBar.css'
import summaryIcon from '../../assets/image/gg_loadbar-doc.svg'
import usersIcon from '../../assets/image/ph_users-fill.svg'
import inventoryIcon from '../../assets/image/solar_box-bold.svg'
import reportIcon from '../../assets/image/akar-icons_statistic-up.svg'
import menuIcon from '../../assets/image/icons8-menú.svg'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ page }) {
	const navigate = useNavigate()

	return (
		<>
			<div className="navBar-container" role="navigation">
				<h2 className="mt-5">Menú</h2>
				<div className="button-menu-list">
					<button
						type="button"
						onClick={() => navigate('/')}
						className={
							page === 'summary'
								? 'actual-page button button-reset'
								: 'button button-reset'
						}
					>
						<img src={summaryIcon} alt="summary icon" />
						Resumen
					</button>
					<button
						type="button"
						onClick={() => navigate('/')}
						className={
							page === 'users'
								? 'actual-page button button-reset'
								: 'button button-reset'
						}
					>
						<img src={usersIcon} alt="users icon" />
						Usuarios
					</button>
					<button
						type="button"
						onClick={() => navigate('/inventory')}
						className={
							page === 'inventory'
								? 'actual-page button button-reset'
								: 'button button-reset'
						}
					>
						<img src={inventoryIcon} alt="inventory icon" />
						Inventario
					</button>
					<button
						type="button"
						onClick={() => navigate('/')}
						className={
							page === 'report'
								? 'actual-page button button-reset'
								: 'button button-reset'
						}
					>
						<img src={reportIcon} alt="report icon" />
						Informe
					</button>
				</div>
			</div>
			{/* OFFCANVAS MENU */}
			<div className="offcanvas-menu">
				<button
					className="hamburger-button"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasMenu"
					aria-controls="offcanvas"
				>
					<img src={menuIcon} alt="menu icon" />
				</button>
				<div
					className="offcanvas offcanvas-start"
					tabIndex="-1"
					id="offcanvasMenu"
					aria-labelledby="offcanvasMenuLabel"
				>
					<div className="offcanvas-header">
						<h2 className="mt-5">Menú</h2>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div className="offcanvas-body">
						<div className="button-menu-list">
							<button
								type="button"
								onClick={() => navigate('/')}
								className={
									page === 'summary'
										? 'actual-page button button-reset'
										: 'button button-reset'
								}
							>
								<img src={summaryIcon} alt="summary icon" />
								Resumen
							</button>
							<button
								type="button"
								onClick={() => navigate('/')}
								className={
									page === 'users'
										? 'actual-page button button-reset'
										: 'button button-reset'
								}
							>
								<img src={usersIcon} alt="users icon" />
								Usuarios
							</button>
							<button
								type="button"
								onClick={() => navigate('/inventory')}
								className={
									page === 'inventory'
										? 'actual-page button button-reset'
										: 'button button-reset'
								}
							>
								<img src={inventoryIcon} alt="inventory icon" />
								Inventario
							</button>
							<button
								type="button"
								onClick={() => navigate('/')}
								className={
									page === 'report'
										? 'actual-page button button-reset'
										: 'button button-reset'
								}
							>
								<img src={reportIcon} alt="report icon" />
								Informe
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
