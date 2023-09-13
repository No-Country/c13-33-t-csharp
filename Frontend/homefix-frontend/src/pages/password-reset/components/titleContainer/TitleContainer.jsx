import React from 'react'
import './TitleContainer.css'
import { useSelector } from 'react-redux'

export default function TitleContainer({ title }) {
	const message = useSelector(state => state.message)

	return (
		<>
			<div className="passwordReset_titleContainer">
				<h2>{title}</h2>
			</div>
			<div className="passwordReset_notification-container">
				{message ? <p style={{ color: '#F14B4B' }}>{message}</p> : null}
			</div>
		</>
	)
}
