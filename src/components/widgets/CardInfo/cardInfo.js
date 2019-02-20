import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardInfo.module.scss';
import moment from 'moment';


const CarInfo = (props) =>{

    const teamName = (teams,team) => {
        let data = teams.find((item)=>{
            return item.teamId === team
            //return item.id === team
        })
        if(data){
            return data.name
        }
    }

    const formatDate = ( (date) =>{
        return moment(date).format(' MM-DD-YYYY');
    })

    return(
        <div className={styles.cardInfo}>
            <span className={styles.teamName}>
                {teamName(props.teams,props.team)}
            </span>
            <span className={styles.date}>
                <FontAwesome name="clock-o"/>
                {formatDate(props.date)}
            </span>
        </div>
    )
}

export default CarInfo;