import axios from "axios";

export const createUser = (userData, token) => async (dispatch) => {
  try {
    const response = await axios.post('https://homefix.fly.dev/api/admin/register', userData, {
      headers: {
        Authorization: token
      },
    });

    if (response.status === 201) {
      const newUser = response.data;
      dispatch({ type: "CREATE_USER", payload: newUser });
	  console.log("producto creado");
    } else {
      console.error("Error al crear el producto:", response.data);
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
};
