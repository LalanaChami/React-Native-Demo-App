import firebase from 'firebase'

class Fire{
    constructor(){
        this.init()
        this.checkAuth()
    }


    //initializing the firebase account with the api key and project id
    init = () =>{
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyD5fbWTiqFztPt-YA6Ftc15wK8jfsheYeg",
                authDomain: "chatapp-9a029.firebaseapp.com",
                databaseURL: "https://chatapp-9a029.firebaseio.com",
                projectId: "chatapp-9a029",
                storageBucket: "chatapp-9a029.appspot.com",
                messagingSenderId: "960092572842",
                appId: "1:960092572842:web:26e800667dfebb15dd94d3",
                measurementId: "G-YX5TV5BX77"
            });
        }
    };


    // if firebase is initialized the authenticating to the firebase project 
    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user =>{
            if(!user){
                firebase.auth().signInAnonymously();
            }
        });
    };


    //pushing the messages into firebase db (storing them)
    send = messages => {
        messages.forEach(item => {
            const message = {
                text : item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };


    //obtaing the recorded or stored messages fro the fire base db
    parse = message => {
        const { user , text , timestamp } =message.val();
        const { key: _id} = message;
        const createdAt = new Date(timestamp);

        return{
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback =>{
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off(){
        this.db.off()
    }

    get db(){
        return firebase.database().ref("messages");
    }
    get uid(){
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();