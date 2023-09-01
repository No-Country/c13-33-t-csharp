import axios from 'axios'
const baseUrl = 'https://homefix.fly.dev/api/articulos/'

const getData = async token => {
	const config = {
		headers: {
			Authorization: token,
		},
        body: {
            
        }
	}
	const response = await axios.patch(baseUrl, config)
	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getData }