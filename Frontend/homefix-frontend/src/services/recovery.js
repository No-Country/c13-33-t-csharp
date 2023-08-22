import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/cuenta/forgot-password'

const recovery = async email => {
	const response = await axios.post(baseUrl, email)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { recovery }
