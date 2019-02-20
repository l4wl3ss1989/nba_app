import React, { Component } from 'react';
import styles from './videosList.module.scss'
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase';
//import axios from  'axios';

//import { URL } from '../../../config';
import Button from '../Buttons/buttons';
import VideosListTemplate from './videosListTemplate';

class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    renderTitle = () => {
        return this.props.title ? 
            <h3><strong>NBA</strong> Videos</h3>
        : null
    }

    componentWillMount() {
        this.request(this.state.start,this.state.end)
    }

    request = (start,end) => {
        
        if(this.state.teams.length < 1){
            //feach teams
            firebaseTeams.once('value')
            .then((snapShot) => {
                const teams = firebaseLooper(snapShot);
                this.setState({
                    teams
                })
            })
            // axios.get(`${URL}/teams`)
            // .then(response => {
            //     this.setState({
            //         teams: response.data
            //     })
            // })
        }
        //feach videos
        firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value')
        .then((snapShot) => {
            const videos = firebaseLooper(snapShot);
            this.setState({
                videos: [...this.state.videos,...videos],
                start,
                end
            })
        })
        .catch(err =>{
            console.log(err)
        })
        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        // .then(response => {
        //     this.setState({
        //         videos: [...this.state.videos,...response.data],
        //         start,
        //         end
        //     })
        // })
    }

    renderVideos = () => {
        let template = null;

        switch (this.props.type) {
            case ('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams} />
                break;
        
            default:
                template = null
                break;
        }
        return template;
    }

    loadMore = () => {
        console.log("more")
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button 
                type="loadmore"
                loadmore={() => this.loadMore()}
                cta="Load More Videos"
            />
        : <Button type="linkTo" cta="More videos" linkTo="/videos" />
    }

    render() {
        return (
            <div className={styles.videosList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;