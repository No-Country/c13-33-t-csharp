import axios from "axios";

export const updateProduct = (productId, updatedProductData, token) => async (dispatch) => {
  try {
    const response = await axios.put(`https://homefix.fly.dev/api/articulos/${productId}`, updatedProductData, {
      headers: {
        Authorization: token
      },
    });

    if (response.status === 200) {
      const updatedProduct = response.data;
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      console.log("producto actualizado");
    } else {
      console.error("Error al actualizar el producto:", response.data);
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};
