import axios from 'axios';

const baseUrl = 'https://homefix.fly.dev/api/articulos';

export const updateProduct = async (updatedProduct) => {
  try {
    // Realiza una solicitud PUT para actualizar el producto
    const response = await axios.patch(`${baseUrl}/${updatedProduct.id}`, updatedProduct);

    // Retorna la respuesta si es necesario
    return response.data;
  } catch (error) {
    // Puedes manejar errores aquí, lanzar o propagar el error si es necesario
    throw error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProduct,
};
