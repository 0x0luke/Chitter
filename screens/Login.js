import { View, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
      super(props)
      
      this.login = this.login.bind(this)

      this.state = {
        username: '',
        password: ''
      };
    }
    // makes post request to given uri with the states defined above 
    login(){
      console.log("sending request...")
      return fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => response.json())
        .then((responseJson) => {
          _storeData = async () => {
            try {
              AsyncStorage.setItem('X-Authorization',responseJson.token);
              AsyncStorage.setItem('id', responseJson.id);
              console.log("OUR AUTH TOKEN IS: " + responseJson.token + "&" + "OUR ID IS: "+ responseJson.id +", STORED VALUES IN ASYNCSTORAGE");
            } catch(error) {
              console.log(error);
            }     
          };
          this.props.navigation.navigate('HomePage');
        }),
      }).catch((error) =>{
          console.log(error);
        });
      }

      render(){
      // renders 2 text inputs for the username and password of the user and creates a login button which calls the function above to authenticate against the database
        return(
          <View>
          <TextInput placeholder='Username' onChangeText={(username) => this.setState({username})}></TextInput>
          <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}></TextInput>
          <Button 
          title = "Login"
          onPress = {this.login}
          ></Button>
          <Button
          title="Register"
          onPress={()=>this.props.navigation.navigate('Register')}>Register</Button>
          </View>
        );
      }
  
  }

  const styles = StyleSheet.create({
    Buttons: {
      //Color: 'black',
      fontSize: 50
    }
  })

export default Login;