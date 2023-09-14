import React from 'react'
import './HeaderBar.css'
import HeaderNavLogo from '../../assets/image/HomeFix-navbar-logo.png'
import { useSelector } from 'react-redux'
import noImg from '../../assets/image/noUserImage.png'

export default function HeaderBar() {
	const user = useSelector(state => state.user)

	return (
		<div className="headerBar-container">
			<nav className="header-navbar">
				<a className="link-logo" href="/">
					<img className="header-logo" src={HeaderNavLogo} alt="HomeFix Logo" />
				</a>
				<div className="header-profile-button dropdown">
					<button
						className="username btn"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<img
							className="profile-icon-image"
							src={!user.imagen ? noImg : user.imagen}
							alt="profile icon"
						/>
						<span className="username-text">{user.userName}</span>
					</button>
					<ul className="dropdown-menu">
						<li>
							<a id="close-link" className="dropdown-item" href="/login">
								Cerrar Sesión
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}
