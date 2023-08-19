import axios from 'axios'
const baseUrl = 'http://localhost:3333/login' //url de desarrollo para pruebas

const login = async credentials => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
