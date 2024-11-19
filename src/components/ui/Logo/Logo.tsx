import logoImg from '../../../assets/icons/subtract_icon.svg';
import { memo } from "react";

const Logo = () => {
    return (
        <div>
            <img src={logoImg} alt="Logo"/>
        </div>
    );
};

export default memo(Logo);