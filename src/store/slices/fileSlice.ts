import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../types/file.ts";

interface IPaginationState {
    currentPage: number;
    last_page: number | null;
}

interface FilesSchema {
    files: IFile[] | null;
    sorting: {
        currentMethod: string | null,
        currentMode: string
    },
    pagination: IPaginationState
}

const initialState:FilesSchema = {
    files: null,
    sorting: {
        currentMethod: null,
        currentMode: 'asc'
    },
    pagination: {
        currentPage: 1,
        last_page: null
    }
}

export const filesSlice = createSlice({
    initialState,
    name: 'filesSlice',
    reducers: {
        setFiles: (state, action: PayloadAction<IFile[]>) => {
            state.files = action.payload;
        },
        removeFiles: (state, action:PayloadAction<null>) => {
            state.files = action.payload;
        },
        setCurrentMethod: (state, action:PayloadAction<string>) => {
            state.sorting.currentMethod = action.payload;
        },
        setCurrentMode: (state, action:PayloadAction<string>) => {
            state.sorting.currentMode = action.payload;
        },
        setPaginationState: (state, action:PayloadAction<IPaginationState>) => {
            state.pagination = action.payload;
        },
        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
        setLastPage: (state, action:PayloadAction<number | null>) => {
            state.pagination.last_page = action.payload;
        }
    }
});

export default filesSlice.reducer;

export const {
    setFiles,
    removeFiles,
    setPaginationState,
    setCurrentPage,
    setLastPage,
    setCurrentMethod,
    setCurrentMode } = filesSlice.actions;