import {createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

const initialState = {
  users: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.error = null;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {setUsers, setLoading, setError} = userSlice.actions;

export const getUsers = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let {data, error} = await supabase.from("users").select("*");
    if (error) {
      throw error;
    }
    dispatch(setUsers(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error(error);
  }
};

export const changeUsername =
  ({username, userId}) =>
  async dispatch => {
    dispatch(setLoading(true));
    try {
      let {data, error} = await supabase
        .from("users")
        .update({username})
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      console.log("Success updating username, returned: ", data);
    } catch (error) {
      dispatch(setError(error.message));
      console.error(error);
    }
  };

export default userSlice.reducer;
