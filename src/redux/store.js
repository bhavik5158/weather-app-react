import { configureStore } from "@reduxjs/toolkit";
import citySlice from "./slice/citySlice";

const store = configureStore({
    reducer: {
        city : citySlice.reducer
    }
})

export default store;