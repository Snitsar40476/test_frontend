import classes from './Files.module.scss';
import img from '../../assets/images/file.png';
import { classNames } from "../../helpers/classNames/classNames.ts";
import ControlsItem from "../ui/ControlsItem/ControlsItem.tsx";
import { STORAGE_URL, useDeleteFileMutation, useLazyDownloadFileQuery, useSetNameFileMutation } from "../../api/fileApi.ts";
import { ContentLoader } from "../ui/ContentLoader";
import {ChangeEvent, useEffect, useRef, useState} from "react";

interface IFileItemProps {
    fileName: string;
    fileSize: string;
    fileKey: string;
    filePath: string;
}

const FileItem = ({ fileName, fileSize, fileKey, filePath }: IFileItemProps) => {
    const [deleteFile, { isLoading }] = useDeleteFileMutation();
    const [setName, { isLoading:setNameLoading }] = useSetNameFileMutation();
    const [downloadFile, { isLoading: loadingDownloadFile }] = useLazyDownloadFileQuery();

    const [nameValue, setNameValue] = useState<string>(fileName);
    const [isFocus, setFocus] = useState<boolean>(false);
    const inputNameRef = useRef<null | HTMLInputElement>(null);


    const deleteFileHandler = async () => {
        try {
            const data = {
                file_key: fileKey,
            }
            await deleteFile(data);
            alert(`Файл ${fileName} успiшно видалено!`);
        }
        catch (error) {
            console.log(error);
            alert('Сталася помилка при видаленнi файлу');
        }
    }

    const changeFileNameHandler = async () => {
        try {
            if (fileName === nameValue) {
                setFocus(false);
                return false;
            }
            const data = {
                file_key: fileKey,
                name: nameValue
            }

            await setName(data);
            setFocus(false);
            alert(`Файл ${nameValue} успiшно перейменовано!`);
        }
        catch (error) {
            console.log(error);
            alert('Сталася помилка при перейменуваннi файлу');
        }
    }

    const doubleClickHandler = () => {
        const url = `${STORAGE_URL}${filePath}`;
        window.open(url, '_blank');
    }

    const changeInputNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameValue(value);
    }

    const focusHandler = () => {
        isFocus ? setFocus(false) : setFocus(true);
    }

    const changeNameFocusInput = () => {
        if(inputNameRef.current) {
            inputNameRef.current.focus();
            setFocus(true);
        }
    }

    const downloadFileHandler = async () => {
        try {
            const data = {
                path: filePath
            }
            const blob = await downloadFile(data).unwrap();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url; link.setAttribute('download', filePath);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch (error) {
            alert('Помилка завантаження файлу');
            console.log(error);
        }
    }

    return (
        <div className={classes.fileItem} onDoubleClick={doubleClickHandler}>
            {isLoading && <ContentLoader />}
            {loadingDownloadFile && <ContentLoader />}
            {setNameLoading && <ContentLoader />}
            <div className={classes.fileInfo}>
                <img src={img} alt={fileName}/>
                <input value={nameValue}
                       type='text'
                       ref={inputNameRef}
                       className={classNames(classes.fileName, {}, [isFocus ? classes['focus'] : ''])}
                       onChange={changeInputNameHandler}
                       onFocus={focusHandler}/>
                <p>{fileSize}</p>
            </div>
            <div className={classNames(classes.fileControls, {}, [isFocus ? classes['active'] : ''])}>
                <div className={classes.topControls}>
                    <button type='button'
                            className={classNames(classes.topControlsButton, {}, [classes['ok']])}
                            onClick={changeFileNameHandler}>
                    </button>
                    <button type='button'
                            className={classNames(classes.topControlsButton, {}, [classes['delete']])}
                            onClick={deleteFileHandler}>
                    </button>
                </div>
                <div className={classes.bottomControls}>
                    <ControlsItem name='download' action={downloadFileHandler}/>
                    <ControlsItem name='shared' />
                    <ControlsItem name='edit' action={changeNameFocusInput}/>
                </div>
            </div>
        </div>
    );
};

export default FileItem;