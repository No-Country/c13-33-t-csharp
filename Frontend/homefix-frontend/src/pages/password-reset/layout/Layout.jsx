import React from 'react'
import './Layout.css';
import "./LayoutResponsive.css";
import ImageContainer from '../../login-form/components/imageContainer/ImageContainer'
import TitleLogoContainer from '../components/titleLogoContainer/TitleLogoContainer'
import TextContainer from '../components/textContainer/TextContainer'
import FormContainer from '../components/formContainer/FormContainer';

export default function Layout() {
	return (
		<div className="passwordReset_layout">
			<ImageContainer />
			<TitleLogoContainer />
			<TextContainer />
			<FormContainer />
		</div>
	)
}
