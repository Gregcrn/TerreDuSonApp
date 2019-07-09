// import * as firebase from 'firebase/app';
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDd_p4-eUHALEyerpObFxwG5NBMtWkRDO4",
    authDomain: "terredusonapp.firebaseapp.com",
    databaseURL: "https://terredusonapp.firebaseio.com",
    projectId: "terredusonapp",
    storageBucket: "",
    messagingSenderId: "798350309807",
    appId: "1:798350309807:web:b99b5dc422a31e68"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;