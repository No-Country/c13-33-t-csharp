import axios from "axios";

export const createProduct = (productData, token) => async (dispatch) => {
  try {
    const response = await axios.post('https://homefix.fly.dev/api/articulos', productData, {
      headers: {
        Authorization: token
      },
    });

    if (response.status === 201) {
      const newProduct = response.data;
      dispatch({ type: "CREATE_PRODUCT", payload: newProduct });
	  console.log("producto creado");
    } else {
      console.error("Error al crear el producto:", response.data);
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
};
