import axios from "../api/axiosConfig";
import { loaduser } from "./userSlice";

export const asyncgetusers = () => async (dispatch, getState) => {
  try {
    console.log("Cuttent State >>>>>>>", getState());

    const response = await axios.get("/users");
    // console.log(response.data);
    dispatch(loaduser(response.data));
  } catch (error) {
    console.log(error);
  }
};
