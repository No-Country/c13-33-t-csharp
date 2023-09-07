import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/cuenta/forgot-password'

const recovery = async email => {
	let response

	try {
		response = await axios.post(baseUrl, email)
	} catch (error) {
		console.log(error.message)
	}
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { recovery }
