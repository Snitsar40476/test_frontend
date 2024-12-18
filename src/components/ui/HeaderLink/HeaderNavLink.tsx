import { FC, PropsWithChildren, useState } from 'react';
import { classNames } from "../../../helpers/classNames/classNames.ts";
import { useDispatch } from "react-redux";
import { setOpen } from "../../../store/slices/courseSlice.ts";
import { useAppSelector } from "../../../store/store.ts";
import classes from './HeaderLink.module.scss';

interface IHeaderNavLinkProps {
    className?: string;
    name: string;
}

const HeaderNavLink:FC<PropsWithChildren<IHeaderNavLinkProps>> = ({ children, className, name }) => {
    const [isActive, setActive] = useState(false);
    const { isOpen } = useAppSelector(state => state.courses);
    const dispatch = useDispatch();

    const toggleActiveHandler = () => {
        if (name === 'courses') {
            isOpen ? dispatch(setOpen(false)) : dispatch(setOpen(true));
            isActive ? setActive(false) : setActive(true);
        }
    }

    return (
        <a className={classNames(classes.headerNavLink, {}, [className ? classes[className] : '', isActive ? classes['active'] : ''])} onClick={toggleActiveHandler}>
            {children}
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.43039 1.16917L4.64939 4.38967L4.86839 4.59236L4.98417 4.69623C5.06778 4.77123 5.17015 4.82218 5.28039 4.84368C5.35898 4.859 5.43979 4.859 5.51838 4.84368C5.62862 4.82218 5.73098 4.77123 5.81459 4.69623L5.93039 4.59236L6.14939 4.38967L9.36839 1.16917C9.50922 1.02834 9.70022 0.949219 9.89939 0.949219C10.0985 0.949219 10.2896 1.02834 10.4304 1.16917C10.5712 1.31 10.6503 1.501 10.6503 1.70017C10.6503 1.89933 10.5712 2.09034 10.4304 2.23117L5.93039 6.73117C5.86072 6.80101 5.77795 6.85643 5.68684 6.89424C5.59572 6.93205 5.49804 6.95151 5.39939 6.95151C5.30073 6.95151 5.20305 6.93205 5.11193 6.89424C5.02082 6.85643 4.93805 6.80101 4.86839 6.73117L0.368385 2.23117C0.227555 2.09034 0.148437 1.89933 0.148437 1.70017C0.148437 1.501 0.227555 1.31 0.368385 1.16917C0.509215 1.02834 0.700222 0.949219 0.899385 0.949219C1.09855 0.949219 1.28956 1.02834 1.43039 1.16917Z"
                    fill="black" fillOpacity="0.56"/>
            </svg>
        </a>
    );
};

export default HeaderNavLink;