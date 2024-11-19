import classes from './LessonItem.module.scss';
import { FC, PropsWithChildren } from "react";
import { classNames } from "../../../helpers/classNames/classNames.ts";

interface LessonLinkProps {
    isRecruitment: boolean;
}

export const LessonItem:FC<PropsWithChildren<LessonLinkProps>> = ({ children, isRecruitment }) => {
    return (
        <div className={classNames(classes.lessonItem, {}, [])}>
            <a className={classes.lessonName}>{children}</a>
            <div className={classNames(classes.recruitmentBlock, {}, [!isRecruitment ? classes['done'] : ''])}>
                <span>{isRecruitment ? 'Йде набір' : 'Набір завершено'}</span>
            </div>
        </div>
    );
};