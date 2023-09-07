import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/cuenta/reset-password'

const reset = async credentials => {
	let response
	try {
		response = await axios.post(baseUrl, credentials)
	} catch (error) {
		console.log(error.message)
	}
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { reset }
