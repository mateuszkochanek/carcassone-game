import React, {Component} from 'react';
import './surrender.css'
import {ReactComponent as CloseIcon} from "../../../assets/close.svg";

/**
 * Class responsible for handling users surrender.
 */
class Surrender extends Component {

    /**
     * Renders component.     */
    render() {
        return (
            <button className={"m-surrender-button"} onClick={() => window.location.reload()}>
                <CloseIcon className={"m-surrender-icon"}/>
            </button>
        );
    }
}

export default Surrender;