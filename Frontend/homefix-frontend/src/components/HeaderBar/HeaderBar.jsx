import React from 'react'
import './HeaderBar.css'
import HeaderNavLogo from '../../assets/image/HomeFix-navbar-logo.png'

export default function HeaderBar() {
	return (
		<div className="headerBar-container">
			<nav className="header-navbar">
				<img className="mt-3 mx-5" src={HeaderNavLogo} alt="Home Fix Logo" />
				<div className="dropdown mt-3 mx-5">
					<button
						className="btn "
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Dropdown button
					</button>
					<ul className="dropdown-menu">
						<li>
							<a className="dropdown-item" href="/#">
								Mi Perfil
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="/login-form">
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}
