import { memo } from 'react';
import { Loader } from '../Loader';
import classes from './ContentLoader.module.scss';

const ContentLoader = () => (
    <div className={classes.contentLoader}>
        <Loader />
    </div>
);

export default memo(ContentLoader);
