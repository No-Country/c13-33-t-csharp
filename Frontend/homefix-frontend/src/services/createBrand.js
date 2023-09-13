import axios from "axios";

export const createBrand = (brandData, token) => async (dispatch) => {
  try {
    const response = await axios.post('https://homefix.fly.dev/api/marca', brandData, {
      headers: {
        Authorization: token
      },
    });

    if (response.status === 201) {
      const newBrand = response.data;
      dispatch({ type: "CREATE_BRAND", payload: newBrand });
	  console.log("marca creada");
    } else {
      console.error("Error al crear la marca:", response.data);
    }
  } catch (error) {
    console.error("Error al crear marca:", error);
  }
};
