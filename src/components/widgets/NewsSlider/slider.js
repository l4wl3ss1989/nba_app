import React, { Component } from 'react';
import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';
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

            const asyncFunction = (item,i,callback) => {
                firebase.storage().ref('images')
                .child(item.image).getDownloadURL()
                .then( url => {
                    news[i].image = url  
                    //Promise done       
                    callback()           
                })
            }

            let requests = news.map((item,i) => {
                return new Promise((resolve) => {
                    asyncFunction(item,i, resolve)
                })
            })

            Promise.all(requests).then(()=> {
                this.setState({
                    news
                })
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