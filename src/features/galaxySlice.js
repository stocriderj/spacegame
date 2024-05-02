import {createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

const initialState = {
  stars: null,
  planets: null,
  loading: false,
  error: null,
};

const galaxySlice = createSlice({
  name: "galaxy",
  initialState,
  reducers: {
    setStars(state, action) {
      state.stars = action.payload;
      state.error = null;
    },
    setPlanets(state, action) {
      state.planets = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {setStars, setPlanets, setLoading, setError} = galaxySlice.actions;

export const getGalaxy = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let {data, error} = await supabase.from("galaxy").select("*");
    if (error) {
      throw error;
    }
    dispatch(setStars(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error(error);
  }

  try {
    let {data, error} = await supabase.from("planets").select("*");
    if (error) {
      throw error;
    }
    dispatch(setPlanets(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error(error);
  }
  dispatch(setLoading(false));
};

export default galaxySlice.reducer;
