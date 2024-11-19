import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setFiles, setPaginationState} from "../store/slices/fileSlice.ts";
import { IResponseGetFiles } from "../store/types/responses.ts";

const BASE_URL = 'http://laravel.local/api/'
export const STORAGE_URL = 'http://laravel.local/storage/'

export const fileApi = createApi({
    reducerPath: 'fileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
        }
    }),
    tagTypes: ['Files'],
    endpoints: (builder) => ({
        uploadFile: builder.mutation<null, FormData>({
            query(formData) {
                return {
                    url: 'uploadFile',
                    method: 'POST',
                    body: formData
                };
                },
            invalidatesTags: ['Files']
        }),
        getFiles: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFiles',
                    method: 'GET',
                    params: data
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                    dispatch(setPaginationState({ currentPage: data.current_page, last_page: data.last_page }))
                }
            },
        }),
        updatePage: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFiles',
                    method: 'GET',
                    params: data
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                    dispatch(setPaginationState({ currentPage: data.current_page, last_page: data.last_page }))
                }
            },
        }),
        deleteFile: builder.mutation<null, { file_key: string }>({
            query(data) {
                return {
                    url: 'deleteFile',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Files'],
        }),
        deleteAllFiles: builder.mutation<null, null>({
            query(data) {
                return {
                    url: 'clearTableFiles',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Files'],
        }),
        setNameFile: builder.mutation<null, { file_key: string, name: string }>({
            query(data) {
                return {
                    url: 'setNameFile',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Files'],
        }),
        setNameFiles: builder.mutation<IResponseGetFiles, { name: string }>({
            query(data) {
                return {
                    url: 'setAllFilesNames',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Files'],
        }),
        downloadFile: builder.query<BlobPart, { path: string; }>({
            query() {
                return {
                    url: `downloadFile`,
                    method: 'GET',
                    responseHandler: (response) => response.blob(),
                }
            }
        }),
        getFilesSortingNameAsc: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFilesSortingNameAsc',
                    method: 'GET',
                    params: data,
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                }
            },
        }),
        getFilesSortingDateDesc: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFilesSortingDateDesc',
                    method: 'GET',
                    params: data
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                }
            },
        }),
        getFilesSortingNameDesc: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFilesSortingNameDesc',
                    method: 'GET',
                    params: data,
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                }
            },
        }),
        getFilesSortingDateAsc: builder.query<IResponseGetFiles, { page: number; }>({
            query(data) {
                return {
                    url: 'getFilesSortingDateAsc',
                    method: 'GET',
                    params: data,
                };
            },
            providesTags: ['Files'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                if (data) {
                    dispatch(setFiles(data.data));
                }
            },
        }),
    })
});

export const {
    useUploadFileMutation,
    useLazyGetFilesSortingDateAscQuery,
    useLazyGetFilesSortingDateDescQuery,
    useLazyGetFilesSortingNameDescQuery,
    useLazyGetFilesSortingNameAscQuery,
    useLazyDownloadFileQuery,
    useLazyUpdatePageQuery,
    useDeleteFileMutation,
    useSetNameFileMutation,
    useDeleteAllFilesMutation,
    useSetNameFilesMutation,
    useGetFilesQuery,
} = fileApi;