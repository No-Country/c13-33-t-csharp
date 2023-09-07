import axios from "axios";

export const updateProduct = (formData, token) => async (dispatch) => {
  try {
    const response = await axios.patch(`https://homefix.fly.dev/api/articulos/${formData.id}`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || 201) {
      const updatedProduct = response.data;
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
      console.log("producto actualizado");
    } else {
      console.log(response);
      console.error("Error al actualizar el producto:", response.data);
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};
