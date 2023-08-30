import './NavBar.css'
import summaryIcon from '../../assets/image/gg_loadbar-doc.svg'
import usersIcon from '../../assets/image/ph_users-fill.svg'
import inventoryIcon from '../../assets/image/solar_box-bold.svg'
import reportIcon from '../../assets/image/akar-icons_statistic-up.svg'
import { useNavigate } from 'react-router-dom'

export default function NavBar({ page }) {
	const navigate = useNavigate()

	return (
		<div className="navBar-container">
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
	)
}
