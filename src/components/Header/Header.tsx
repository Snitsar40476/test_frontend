import classes from './Header.module.scss';
import Logo from "../ui/Logo/Logo.tsx";
import HeaderSocialLink from "../ui/HeaderLink/HeaderSocialLink.tsx";
import HeaderLink from "../ui/HeaderLink/HeaderLink.tsx";
import HeaderNavLink from "../ui/HeaderLink/HeaderNavLink.tsx";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { setOpen } from '../../store/slices/courseSlice.ts';
import { classNames } from '../../helpers/classNames/classNames.ts';

const Header = () => {
    const { isOpen } = useAppSelector(state => state.courses);
    const dispatch = useDispatch();

    const toggleOpen = () => {
        isOpen ? dispatch(setOpen(false)) : dispatch(setOpen(true));
    }

    return (
        <header className={classes.header}>
            <div className={classes.header__left}>
                <Logo />
                <nav className={classes.header__nav}>
                    <HeaderNavLink name='courses'>Курси</HeaderNavLink>
                    <HeaderNavLink name='trainings'>Тренінги</HeaderNavLink>
                    <HeaderNavLink name='about'>Про нас</HeaderNavLink>
                </nav>
            </div>
            <div className={classes.header__right}>
                <HeaderLink className='telephone'>+38 (000) 012-3456</HeaderLink>
                <div className={classes.header__socials}>
                    <HeaderSocialLink className='instagram' />
                    <HeaderSocialLink className='facebook' />
                    <HeaderSocialLink className='youtube' />
                </div>
                <HeaderLink className='login'>Увійти</HeaderLink>
                <button onClick={toggleOpen} type='button' className={classNames(classes.closeCoursesMobile, {}, [!isOpen ? classes['isClosed'] : ''])}></button>
            </div>
        </header>
    );
};

export default Header;