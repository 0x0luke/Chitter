import React, {Component} from 'react';
import { Text,Alert,View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
const Realm = require('realm');

class ViewDrafts extends Component {
    constructor(props){
        super(props);

        this.state ={
            token: '',
            draftChits: '',
            realm: null
        }
    }

    componentDidMount(){

      Realm.open({
        schema:[{name: 'Chits', properties: {name: 'string'}}]
      }).then(realm => {

        realm.write(() => {
          realm.create('Chits',{name: this.state.draftChit});
        });

        this.setState({realm});
      })
    }

    async getCreds(){
        try{
          var getAuthKey = await AsyncStorage.getItem('X-Authorization');
    
          console.log(getAuthKey);
    
          this.setState({ 
            token: getAuthKey
         });
        }
        catch(error){
          console.log("Error within Async: "+error);
          Alert.alert("There was an issue with getting authentication data from the storage...");
        }
      }
      render(){

      }

}

