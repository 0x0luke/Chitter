import { Text,Alert,View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


// TODO: User profile images.
class AccountEdit extends Component {
    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);

        this.state = {
            email: '',
            username: '',
            family: '',
            password: '',
            token: '',
            udid: '',

        }
    }


    async getCreds(){
        try{
          var userID = await AsyncStorage.getItem('id');
          var getAuthKey = await AsyncStorage.getItem('X-Authorization');

          console.log(getAuthKey);

          this.setState({ 
            udid: userID,
            authkey: getAuthKey
         });
        }
        catch(error){
          console.log("Error within Async: "+error);
          Alert.alert("There was an issue with getting authentication data from the storage...");
        }
      }

    updateDetails(id){
        const JSONdata = {
            email: this.state.email,
            username: this.state.username,
            family: this.state.family,
            password: this.state.password
          }

      const POSTdata = JSON.stringify(JSONdata);

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token,
          },
          body: POSTdata
        })
          .then((response) => {
              if(response.status != 200)
              {
                throw("Response error: " + response.status);
              }
              return Alert.alert("Update complete!")
            }).catch((error) => {
                console.log(error);
            });
      }


    render() {
        return(
            <View>

        <TextInput style={styles.TextInputStyle} type='text' placeholder='Email' onChangeText={(email) => this.setState({email})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='First Name' onChangeText={(username) => this.setState({username})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='Last Name' onChangeText={(family) => this.setState({family})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='password' placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}></TextInput>
          <TouchableOpacity
          style={styles.UpdateButton}
          title = "Update"
          onPress = {this.updateDetails(this.state.userID)}
          ><Text style={styles.ButtonTextStyle}>Update Details</Text></TouchableOpacity>
            </View>
        );
    }

}

const style = StyleSheet.create({
    TextInputStyle:{
        textAlign: 'center',
        height: 50,
        borderWidth: 2,
        borderColor:'#202646',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginHorizontal: 40,
        marginTop:20,
      },
      ButtonTextStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:20,
        textAlign: 'center',
        color:'#ffffff',
      },
      UpdateButton: {
        flex:1,
        justifyContent: 'center',
        marginBottom: 36,
        marginTop:  20,
        marginHorizontal: 84,
        fontSize: 20,
        color:'#ffffff',
        textAlign:'center',
        padding:20,
        backgroundColor: '#202646',
        borderRadius:5
      }
})

export default AccountEdit;