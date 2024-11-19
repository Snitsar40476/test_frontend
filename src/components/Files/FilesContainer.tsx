import classes from './Files.module.scss';
import Controls from "./Controls.tsx";
import FileItem from "./FileItem.tsx";
import { useGetFilesQuery } from "../../api/fileApi.ts";
import { IFile } from "../../store/types/file.ts";
import { Loader } from "../ui/Loader";
import { useAppSelector } from "../../store/store.ts";
import Pagination from "../Pagination/Pagination";
import {useEffect} from "react";

const FilesContainer = () => {
    const currentPage = useAppSelector(state => state.files.pagination.currentPage);
    const lastPage = useAppSelector(state => state.files.pagination.last_page);
    const { data: files, isLoading } = useGetFilesQuery({ page: currentPage });
    const filesObject = useAppSelector(state => state.files.files);

    const renderFiles = () => {
        if (!isLoading) {
            if (filesObject) {
                return filesObject.map((file:IFile, index: number) => <FileItem
                    key={`${file.file_key}${index}`}
                    fileKey={file.file_key}
                    fileSize={file.size}
                    fileName={file.name}
                    filePath={file.path}/>
                )
            }
        }
        return true;
    }

    return (
        <section className={classes.filesContainer}>
            <Controls />
            <div className={classes.filesList}>
                { isLoading && <Loader /> }
                {renderFiles()}
            </div>
            {lastPage !== 1 && <Pagination/>}
        </section>
    );
};

export default FilesContainer;