import React from 'react'
import './HeaderBar.css'
import HeaderNavLogo from '../../assets/image/HomeFix-navbar-logo.png'
import { useSelector } from 'react-redux'

export default function HeaderBar() {
	const user = useSelector(state => state.user)

	const placeHolderProfileImage =
		'https://www.shareicon.net/data/2016/07/05/791224_man_512x512.png'

	return (
		<div className="headerBar-container">
			<nav className="header-navbar">
				<a href="/">
					<img className="header-logo" src={HeaderNavLogo} alt="HomeFix Logo" />
				</a>
				<div className="header-profile-button dropdown">
					<img
						className="profile-icon-image"
						src={placeHolderProfileImage}
						alt="profile icon"
					/>
					<button
						className="username btn"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{user.userName}
					</button>
					<ul className="dropdown-menu">
						<li>
							<a id="profile-link" className="dropdown-item" href="/#">
								Mi Perfil
							</a>
						</li>
						<li>
							<a id="close-link" className="dropdown-item" href="/login-form">
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}
