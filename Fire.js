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
                //enter your fire base CDN code from your project here
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
