const RecoveryContainer = ({ receivedCode, setReceivedCode, verifyCode }) => {
	const handleSubmit = event => {
		event.preventDefault()
		verifyCode()
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="receivedCode">Introduzca el código recibido</label>
			<input
				type="text"
				maxLength="4"
				name="receivedCode"
				id="receivedCode"
				value={receivedCode}
				onChange={({ target }) => setReceivedCode(target.value)}
			/>
			<button type="submit">Verificar</button>
		</form>
	)
}

export default RecoveryContainer
