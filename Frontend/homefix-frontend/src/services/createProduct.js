import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/articulos'

const createProduct = async newPrduct => {
	const response = await axios.post(baseUrl, newPrduct)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createProduct }

