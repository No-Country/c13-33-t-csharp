import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/Resumen/ventasultimos6meses'

const getData = async token => {
	const config = {
		headers: {
			Authorization: token,
		},
	}
	let response
	try {
		response = await axios.get(baseUrl, config)
	} catch (error) {
		console.log(error.message)
	}
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData }
