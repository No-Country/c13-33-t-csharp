import React from 'react'
import './LogoContainer.css'
import loginLogo from '../../../../assets/image/LOGO-HomeFix.png'

export default function LogoContainer() {
	return (
		<div className="login_logoContainer">
			<img className="login_logoImage" src={loginLogo} alt="Homefix Logo" />
		</div>
	)
}
