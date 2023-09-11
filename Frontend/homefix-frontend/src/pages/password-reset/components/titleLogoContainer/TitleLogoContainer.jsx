import React from 'react'
import './TitleLogoContainer.css'
import TitleContainer from '../titleContainer/TitleContainer'
import LogoContainer from '../logoContainer/LogoContainer'

export default function TitleLogoContainer({ title }) {
	return (
		<div className="passwordReset_titleLogoContainer">
			<TitleContainer title={title} />
			<LogoContainer />
		</div>
	)
}
