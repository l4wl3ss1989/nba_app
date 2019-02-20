import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';
//import axios from 'axios';


import SliderTemplates from './slider_templates';
//import { URL } from '../../../config';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount(){

        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaseLooper(snapshot);
            this.setState({
                news
            })
        })        
        //// db.json -> npm run dev-serv
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        // .then( response => {
        //     this.setState({
        //         news: response.data
        //     })
        // })
    }

    render() {
        //console.log(this.state.news)
        return (
            <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        );
    }
}

export default NewsSlider;