import React from 'react';
import styles from '../videosList.module.scss'
import VideoListTemplate from '../videosListTemplate';

const VideosRelated = (props) => {
    //console.log(props);
    return (
        <div className={styles.relatedWrapper}>
            <VideoListTemplate 
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
};

export default VideosRelated;