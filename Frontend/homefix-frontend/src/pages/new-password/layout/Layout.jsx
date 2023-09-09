import React from 'react'
import './Layout.css'
import ImageContainer from '../../login-form/components/imageContainer/ImageContainer'
import TitleLogoContainer from '../../password-reset/components/titleLogoContainer/TitleLogoContainer'
import LogoRespContainer from '../../login-form/components/logoRespContainer/LogoRespContainer'
import TextContainer from '../../password-reset/components/textContainer/TextContainer'
import FormContainer from '../components/formContainer/FormContainer'

export default function Layout() {
	return (
		<div className="newPassword_layout">
			<ImageContainer />
			<div className="newPassword-main-container">
				<TitleLogoContainer title="Restablecer contraseña" />
				<LogoRespContainer />
				<TextContainer text="Ingresa una nueva contraseña con al menos 6 caracteres y una combinación de números y caracteres especiales (!$@%)." />
				<FormContainer />
			</div>
		</div>
	)
}
