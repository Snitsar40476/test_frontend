import { classNames } from "../../../helpers/classNames/classNames";
import classes from "./HeaderLink.module.scss";
import { memo } from "react";

interface HeaderSocialLinkProps {
    className: string;
}

const HeaderSocialLink = ({ className }:HeaderSocialLinkProps ) => {
    return (
        <a target='_blank' className={classNames(classes.headerSocialLink, {}, [classes[className]])}></a>
    );
};

export default memo(HeaderSocialLink);