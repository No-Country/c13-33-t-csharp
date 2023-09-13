import axios from 'axios'

export const updateProduct = async (formData, token) => {
	try {
		const response = await axios.patch(
			`https://homefix.fly.dev/api/articulos/${formData.id}`,
			formData,
			{
				headers: {
					Authorization: token,
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error al actualizar el producto:', error.message)
	}
}
