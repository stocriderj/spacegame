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
    console.log({data, error})
    dispatch(setUsers(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error(error);
  }
};

/**
 * Accepts an object and updates the user
 * 
 * @param {object} fields an object with updated fields. non-updating fields do not have to be included
 * @param {uuid} userId the id of the user to edit. must be same as authenticated user
 * @returns nothing lmao
 */
export const updateUser =
  ({fields, userId}) =>
  async dispatch => {
    dispatch(setLoading(true));
    try {
      let {data, error} = await supabase
        .from("users")
        .update(fields)
        .eq("id", userId)
        .select("*");
      if (error) {
        throw error;
      }
      console.log("Success updating username, returned: ", data);
      dispatch(setUsers(data))
    } catch (error) {
      dispatch(setError(error.message));
      console.error(error);
    }
  };

export default userSlice.reducer;
