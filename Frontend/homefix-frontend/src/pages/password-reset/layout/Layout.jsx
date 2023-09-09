import React from 'react'
import './Layout.css'
import ImageContainer from '../../login-form/components/imageContainer/ImageContainer'
import TitleLogoContainer from '../components/titleLogoContainer/TitleLogoContainer'
import LogoRespContainer from '../../login-form/components/logoRespContainer/LogoRespContainer'
import TextContainer from '../components/textContainer/TextContainer'
import FormContainer from '../components/formContainer/FormContainer'

export default function Layout() {
	return (
		<div className="passwordReset_layout">
			<ImageContainer />
			<div className="login-main-reset-container">
				<TitleLogoContainer title="¿Olvidaste tu contraseña?" />
				<LogoRespContainer />
				<TextContainer
					text="Ingresa el correo electrónico asociado a tu cuenta. Te enviaremos las
				instrucciones a seguir para restablecer tu contraseña:"
				/>
				<FormContainer />
			</div>
		</div>
	)
}
