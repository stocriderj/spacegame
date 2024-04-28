import {createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

const initialState = {
  galaxy: null,
  loading: false,
  error: null,
};

const galaxySlice = createSlice({
  name: "galaxy",
  initialState,
  reducers: {
    setGalaxy(state, action) {
      state.galaxy = action.payload;
      state.loading = false;
      state.error = null;
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

export const {setGalaxy, setLoading, setError} = galaxySlice.actions;

export const getGalaxy = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let {data, error} = await supabase.from("galaxy").select("*");
    if (error) {
      throw error;
    }
    dispatch(setGalaxy(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default galaxySlice.reducer;
