import { useAppSelector } from '../../store/store';
import classes from './Pagination.module.scss';
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../store/slices/fileSlice.ts";
import { useEffect} from "react";
import { useLazyUpdatePageQuery } from "../../api/fileApi.ts";
import { classNames } from '../../helpers/classNames/classNames.ts';

const Pagination = () => {
    const paginationInfo = useAppSelector(state => state.files.pagination);
    const lastPage = paginationInfo.last_page;
    const currentPage = paginationInfo.currentPage;
    const [updatePage] = useLazyUpdatePageQuery();


    const dispatch = useDispatch();

    const prevPage = async () => {
        if (currentPage > 1) {
            await pageChangeHandler(paginationInfo.currentPage - 1);
        }
    }

    const nextPage = async () => {
        if (lastPage) {
            if (currentPage < lastPage) {
                await pageChangeHandler(currentPage + 1);
            }
        }
    }

    const pageClickHandler = async (page: number) => {
        try {
            await updatePage({ page: page }).unwrap();
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
    }

    const pageChangeHandler = async (page: number) => {
        try {
            await updatePage({ page: page }).unwrap();
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
    }

    const renderPagesNumber = () => {
        const numbers = [];

        if (lastPage) {
            for (let i = 1; i <= lastPage; i++) {
                numbers.push(
                    <button key={i}
                            onClick={() => pageClickHandler(i)}
                            className={classNames(classes.numberPage, {}, [currentPage === i ? classes['active'] : ''])}>
                        {i}
                    </button>);
            }
        }
        return numbers;
    }

    return (
        <div className={classes.pagination}>
            <button type='button' onClick={prevPage} className={classNames(classes.controlPagination, {}, [classes['prev']])}></button>
            {renderPagesNumber()}
            <button type='button' onClick={nextPage} className={classNames(classes.controlPagination, {}, [classes['next']])}></button>
        </div>
    );
};

export default Pagination;