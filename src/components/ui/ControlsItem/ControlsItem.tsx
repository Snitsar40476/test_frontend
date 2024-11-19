import classes from './ControlsItem.module.scss';
import { classNames } from "../../../helpers/classNames/classNames.ts";
import { LegacyRef, memo } from "react";

interface IControlsItemProps {
    action?: (e?: any) => void;
    name: string;
    inputRef?: LegacyRef<HTMLInputElement> | null;
}

const ControlsItem = ({ action, name, inputRef }: IControlsItemProps) => {
    switch (name) {
        case 'upload': {
            return (
                <label htmlFor="file-upload" className={classNames(classes.controlsItem, {}, [classes[name]])}>
                    <input id='file-upload'
                           ref={inputRef}
                           type="file"
                           name={name}
                           onChange={action ? (e) => action(e) : () => false} />
                </label>
            );
        }
        case 'download': {
            return (
                <a
                    className={classNames(classes.controlsItem, {}, [classes[name]])}
                    onClick={() => action ? action() : false}></a>
            );
        }
        default:  {
            return (
                <button
                    className={classNames(classes.controlsItem, {}, [classes[name]])}
                    onClick={(e) => action ? action(e) : false}></button>
            );
        }
    }
};

export default memo(ControlsItem);