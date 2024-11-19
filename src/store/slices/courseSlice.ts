import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpenCourseContainerSchema } from "../types/openCourseContainer.ts";


const initialState:OpenCourseContainerSchema = {
    isOpen: false
}

export const coursesSlice = createSlice({
    initialState,
    name: 'coursesReducer',
    reducers: {
        setOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    }
});

export default coursesSlice.reducer;

export const { setOpen } = coursesSlice.actions;