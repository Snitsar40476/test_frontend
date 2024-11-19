import { classNames } from "../../helpers/classNames/classNames.ts";
import CourseItem from "./CourseItem.tsx";
import { CoursesInfo } from "../../const/coursesInfo.ts";
import { useAppSelector } from "../../store/store.ts";
import HeaderLink from "../ui/HeaderLink/HeaderLink";
import HeaderSocialLink from "../ui/HeaderLink/HeaderSocialLink";
import classes from './Courses.module.scss';

const mobileFooter = () => {
    return (
        <div className={classes.mobileFooter}>
            <HeaderLink className='telephone_footer'>+38 (000) 012-3456</HeaderLink>
            <div className={classes.footer__socials}>
                <HeaderSocialLink className='instagram' />
                <HeaderSocialLink className='facebook' />
                <HeaderSocialLink className='youtube' />
            </div>
        </div>
    );
}

const CoursesContainer = () => {
    const { isOpen } = useAppSelector(state => state.courses);

    const renderCourses = () => {
        return CoursesInfo.map((course, index) => <CourseItem key={`${course.courseTitle}${index}`} courseTitle={course.courseTitle}
                                                       lessons={course.lessons}
                                                       titleColor={course.titleColor} />);
    }


    return (
        <div className={classNames(classes.coursesContainer, {}, [!isOpen ? classes['hide'] : ''])}>
            { renderCourses() }
            { isOpen && mobileFooter() }
        </div>
    );
};

export default CoursesContainer;