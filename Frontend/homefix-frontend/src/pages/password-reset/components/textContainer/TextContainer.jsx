import React from 'react'
import './TextContainer.css'

export default function TextContainer({ text }) {
	return (
		<div className="passwordReset_textContainer">
			<p className="passwordReset_text">{text}</p>
		</div>
	)
}
