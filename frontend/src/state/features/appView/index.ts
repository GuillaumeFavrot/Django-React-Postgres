import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../../store'

const appViewSlice = createSlice({
  name: "appView",
  initialState: {
    theme: {
      mainBackground: "secondary",
      secondaryBackground: "dark",
      border: "light",
      text: "light"
    }
  },
  reducers: {
    modifyPage(state, action) {
      state.theme = action.payload;
    }
  }
})

export const selectTheme = (state: RootState) => state.appView.theme

export const { modifyPage } = appViewSlice.actions
export default appViewSlice.reducer