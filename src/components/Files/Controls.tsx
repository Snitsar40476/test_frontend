import classes from './Files.module.scss';
import ControlsItem from "../ui/ControlsItem/ControlsItem.tsx";
import {
    useDeleteAllFilesMutation,
    useLazyDownloadFileQuery, useLazyGetFilesSortingDateAscQuery, useLazyGetFilesSortingDateDescQuery,
    useLazyGetFilesSortingNameAscQuery,
    useLazyGetFilesSortingNameDescQuery, useSetNameFilesMutation,
    useUploadFileMutation
} from "../../api/fileApi.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/store.ts";
import { classNames } from '../../helpers/classNames/classNames.ts';
import { useDispatch } from 'react-redux';
import {setCurrentMethod, setCurrentMode, setFiles} from "../../store/slices/fileSlice";


const Controls = () => {
    const currentPage = useAppSelector(state => state.files.pagination.currentPage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadFile] = useUploadFileMutation();
    const [openDropdown, setOpenDropdown] = useState(false);
    const files = useAppSelector(state => state.files.files);
    const [downloadFiles] = useLazyDownloadFileQuery();
    const [deleteFiles] = useDeleteAllFilesMutation();
    const [activeAllRename, setActiveAllRename] = useState(false);
    const [valueChangeAllNames, setValueChangeAllNames] = useState('');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const sorting = useAppSelector(state => state.files.sorting);
    const sortingMode = sorting.currentMode;
    const dispatch = useDispatch();

    const [sortingNameAsc] = useLazyGetFilesSortingNameAscQuery();
    const [sortingNameDesc] = useLazyGetFilesSortingNameDescQuery();
    const [sortingDateAsc] = useLazyGetFilesSortingDateAscQuery();
    const [sortingDateDesc] = useLazyGetFilesSortingDateDescQuery();
    const [setNames, { isLoading: loadingSetNames }] = useSetNameFilesMutation();

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
            await uploadFileHandler(file);
        }
    }

    const inputSetAllNames = () => {
        const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setValueChangeAllNames(value);
        }

        const allRenameHandler = async () => {
            try {
                await setNames({ name: valueChangeAllNames });
            } catch (error) {
                alert(`Помилка ${error}`);
                console.log(error);
            }
        }

        return (
            <form className={classNames(classes.renameAll, {}, [])}>
                <label htmlFor="renameAll">
                    <input placeholder='Введіть нове ім`я' type="text" id='renameAll' value={valueChangeAllNames} onChange={onChangeInput}/>
                </label>
                <button onClick={allRenameHandler} type='button'>{!loadingSetNames ? 'Замінити!' : 'Завантаження...'}</button>
            </form>
        );
    }

    const uploadFileHandler = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file as Blob);

        try {
            await uploadFile(formData).unwrap();
            alert(`Файл успiшно збережено`);
        } catch (error) {
            alert(`Помилка при завантаженнi файлу ${error}`);
            console.log(error);
        }
        if (inputRef.current) inputRef.current.value = '';
    }

    const toggleSortingMode = () => {
        sorting.currentMode === 'asc' ? dispatch(setCurrentMode('desc')) : dispatch(setCurrentMode('asc'));
    }

    const toggleDropDown = () => {
        openDropdown ? setOpenDropdown(false) : setOpenDropdown(true);
    }

    useEffect(() => {
        const sortingHandler = async () => {
            switch (sorting.currentMethod) {
                case 'name': {
                    if (sortingMode === 'asc') {
                        try {
                            await sortingNameAsc({ page: currentPage }).unwrap();
                        } catch (error) {
                            alert('Помилка при сортуваннi');
                            console.log(error);
                        }
                        return false;
                    }

                    try {
                        await sortingNameDesc({ page: currentPage }).unwrap();
                    } catch (error) {
                        alert('Помилка при сортуваннi');
                        console.log(error);
                    }
                    return false;
                }
                case 'date': {
                    if (sortingMode === 'asc') {
                        try {
                            await sortingDateAsc({ page: currentPage }).unwrap();
                        } catch (error) {
                            alert('Помилка при сортуваннi');
                            console.log(error);
                        }
                        return false;
                    }

                    try {
                        await sortingDateDesc({ page: currentPage }).unwrap();
                    } catch (error) {
                        alert('Помилка при сортуваннi');
                        console.log(error);
                    }
                    return false;
                }
                default:
                    return false;
            }
        }
        sortingHandler();
    }, [sorting]);

    const downloadAllFiles = async () => {
        if (files) {
            if (files.length > 0) {
                for (const file of files) {
                    try {
                        const blob = await downloadFiles({ path: file.path }).unwrap();
                        const url = window.URL.createObjectURL(new Blob([blob]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file.path);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } catch (error) {
                        alert(`Помилка в завантаженнi файлу ${file.path}`)
                        console.log(error);
                    }
                }
            }
        }
    }

    const deleteAllFilesHandler = async () => {
        if (files) {
            if (files.length > 0) {
                try {
                    await deleteFiles(null).unwrap();
                } catch (error) {
                    alert(`Помилка в видаленнi файлiв`);
                    console.log(error);
                }
            }
        }
    }

    return (
        <div className={classes.controlsContainer}>
            <div className={classes.leftControls}>
                <ControlsItem
                    name='upload'
                    action={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
                    inputRef={inputRef}
                />
                <ControlsItem name='trash' action={deleteAllFilesHandler}/>
                <ControlsItem name='edit'  action={activeAllRename ? () => setActiveAllRename(false) : () => setActiveAllRename(true)}/>
                <ControlsItem name='download' action={downloadAllFiles}/>
                <ControlsItem name='shared'/>
                <ControlsItem name='search'/>
            </div>
            { activeAllRename && inputSetAllNames() }
            <div className={classes.rightControls}>
                <div className={classes.sorting}>
                    <div className={classNames(classes.currentSorting, {}, [openDropdown ? classes['active'] : ''])}
                         onClick={toggleDropDown}>
                        <span>{!sorting.currentMethod ? 'Сортування' : sorting.currentMethod}</span>
                        <div className={classNames(classes.dropdown, {}, [openDropdown ? classes['active'] : ''])}>
                            <div onClick={() => dispatch(setCurrentMethod('name'))}>Name</div>
                            <div onClick={() => dispatch(setCurrentMethod('date'))}>Date</div>
                        </div>
                    </div>
                </div>
                <button type='button'
                        className={classNames(classes.sortingMode, {}, [sortingMode === 'desc' ? classes['desc'] : ''])}
                        onClick={toggleSortingMode}></button>
            </div>
        </div>
    );
};

export default Controls;