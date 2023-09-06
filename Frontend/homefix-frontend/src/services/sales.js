import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/ventas'

const getMonthSales = async (token, id) => {
	const config = {
		headers: {
			Authorization: token,
		},
	}

	let response = {}

	try {
		response = await axios.get(`${baseUrl}/${id}`, config)
	} catch (error) {
		console.log(error.message)
	}

	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getMonthSales }
