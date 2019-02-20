import React from 'react';
import { Link } from 'react-router-dom'

import Slick from 'react-slick';
import styles from './slider.module.scss'

const SliderTemplates = (props) => {
    
    let template = null;
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slideToShow: 1,
        slidesToScroll: 1,
        //This will overwrite values
        ...props.settings        
    }

    switch(props.type){
        case('featured'):
            template = props.data.map( (item,i) =>{
                return(
                    <div key={i}>
                        <div className={styles.featured_item}>
                            <div className={styles.featured_image}
                                style={{
                                    background: `url(../images/articles/${item.image})`
                                }}></div>
                            <Link to={`/atrticles/${item.id}`}>
                                <div className={styles.featured_caption}>
                                    {item.title}
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })
            break;
        default:
            return template = null;
    }
    
    return(
        <Slick {...settings}>
            {template}
        </Slick>
    )
}

export default SliderTemplates;
