import { memo } from 'react';
import { LessonItem } from "../ui/LessonItem/LessonItem.tsx";
import { classNames } from "../../helpers/classNames/classNames.ts";
import { ILesson } from "../../const/coursesInfo.ts";
import classes from './Courses.module.scss';
import img from '../../assets/icons/check_icon.png';


interface ICourseItemProps {
    courseTitle: string;
    titleColor: string;
    lessons: ILesson[];
}

const CourseItem = ({ courseTitle, titleColor, lessons }:ICourseItemProps) => {
    const renderLessons = () => {
        return lessons.map((lesson, index) =>
            <LessonItem key={`${lesson.lessonTitle}${index}`} isRecruitment={lesson.isRecruitment}>{lesson.lessonTitle}</LessonItem>);
    }

    return (
        <div className={classes.courseItem}>
            <h3 className={classNames(classes.courseTitle, {}, [classes[titleColor]])}>
                <span className={classes[titleColor]}><img src={img} alt=""/></span>
                {courseTitle}
            </h3>

            {renderLessons()}
        </div>
    );
};

export default memo(CourseItem);