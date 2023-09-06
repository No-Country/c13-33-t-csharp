export const useMonthNames = monthsInNumbers => {
	const date = new Date()
	const monthsInTextSpanish = monthsInNumbers.map(monthNumber => {
		date.setMonth(monthNumber)
		return new Intl.DateTimeFormat('es-ES', {
			month: 'long',
		}).format(date)
	})

	return monthsInTextSpanish
}
