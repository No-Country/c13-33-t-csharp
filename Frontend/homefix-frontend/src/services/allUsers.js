import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/usuarios'

const getData = async token => {
	const config = {
		headers: {
			Authorization: token,
		},
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData }
