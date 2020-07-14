import React from "react";
import {View, Text , StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat, Message } from 'react-native-gifted-chat';
import Fire from "../Fire";

export default class ChatScreen extends React.Component{

    state = {
        messages: []
    }


    //this function is used to obtain the user detailes to the chat 
    get user(){
        return{
            _id: Fire.uid,
            name: this.props.navigation.state.params.name
        }
    }


    // here we obtain the data from the fire base db and apend it to the imported gited chat body
    componentDidMount(){
        Fire.get(message => 
            this.setState(previous =>({
            messages: GiftedChat.append(previous.messages,message)
        })))
    }

    //discoonection from the db
    componentWillUnmount(){
        Fire.off();
    }

    // The UI we see from out side is obtained from render function 

    render(){

        //Gifted chat template is taken into a contant
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;

        if(Platform.OS ==="ios"){
            return(
                <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }

        //the basic UI we see on Chat screen
        return <SafeAreaView style= {{flex:1 }}>{chat}</SafeAreaView>
    }
}

