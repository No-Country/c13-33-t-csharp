import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/cuenta/reset-password'

const reset = async credentials => {
	console.log(credentials)
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { reset }
