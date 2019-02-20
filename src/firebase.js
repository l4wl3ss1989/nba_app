import * as firebase from 'firebase';
import {CONFIG_FIREBASE} from './configIgnore';

firebase.initializeApp(CONFIG_FIREBASE);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    //console.log(snapshot)
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })                
    });
    return data;
}

export{
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
}