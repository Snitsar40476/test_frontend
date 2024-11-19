import { configureStore } from "@reduxjs/toolkit";
import CourseSlice from "./slices/courseSlice.ts";
import FileSlice from "./slices/fileSlice.ts";
import { fileApi } from "../api/fileApi.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        courses: CourseSlice,
        files: FileSlice,
        [fileApi.reducerPath]: fileApi.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false,
        },
    ).concat([fileApi.middleware])
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;