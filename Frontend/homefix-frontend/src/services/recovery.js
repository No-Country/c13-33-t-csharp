import axios from 'axios'
const baseUrl = 'http://localhost:3333/recovery' //url de desarrollo para pruebas

const recovery = async recoveryData => {
	const response = await axios.post(baseUrl, recoveryData)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { recovery }
