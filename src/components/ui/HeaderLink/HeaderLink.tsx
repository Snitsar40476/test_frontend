import classes from './HeaderLink.module.scss';
import { classNames } from "../../../helpers/classNames/classNames";
import { FC, PropsWithChildren } from "react";

interface HeaderLinkProps {
    className: string;
}

const HeaderLink:FC<PropsWithChildren<HeaderLinkProps>> = ({children, className}) => {
    return (
        <a className={classNames(classes.headerLink, {}, [classes[className]])}>{children}</a>
    );
};

export default HeaderLink;