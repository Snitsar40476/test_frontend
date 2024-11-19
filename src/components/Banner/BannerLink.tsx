import { FC, PropsWithChildren } from 'react';
import classes from './Banner.module.scss';
import { classNames } from "../../helpers/classNames/classNames.ts";

interface IBannerLinkProps {
    className: string;
}

const BannerLink:FC<PropsWithChildren<IBannerLinkProps>> = ({ children, className }) => {
    return (
        <a className={classNames(classes.bannerLink, {}, [classes[className]])}>{children}</a>
    );
};

export default BannerLink;