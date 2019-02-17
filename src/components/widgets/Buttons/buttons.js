import React from 'react';
import { Link } from 'react-router-dom';

import styles from './buttons.module.scss';

const Buttons = (props) => {
    let template = null;
    
    switch(props.type){
        case 'loadmore':
            template = (
                <div className={styles.blue_btn}
                    onClick={props.loadmore}
                >
                    {props.cta}
                </div>
            )
            break;
        default:
        template = null
    }
    return template;
}

export default Buttons;