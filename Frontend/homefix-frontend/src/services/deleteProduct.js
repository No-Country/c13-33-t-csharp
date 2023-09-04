import axios from "axios";

export const deleteProduct = (productId, token) => async (dispatch) => {
  try {
    await axios.delete(`https://homefix.fly.dev/api/articulos/${productId}`, {
      headers: {
        Authorization: token
      },
    });

    dispatch({type: "DELETE_PRODUCT", payload: productId });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};
