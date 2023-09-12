import axios from 'axios'

export const createSale = async (saleData, token) => {
    console.log('saleData',saleData);
	try {
		const response = await axios.post(
			"https://homefix.fly.dev/api/movimiento",
			saleData,
			{
				headers: {
					Authorization: token,
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error al actualizar el producto:', error.message)
	}
}
