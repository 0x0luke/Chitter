import { View, TextInput, Button, json, StyleSheet, AsyncStorage } from 'react-native';
import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: ''
      };
    }
    // makes post request to given uri with the states defined above 
    POSTData = () =>{
      console.log("sending request...")
      return fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: json.Stringify ({
            'username': this.state.username,
            'password': this.state.password
        })
        .then((response) = response.json())
        .then((responseJson) => {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem('X-Authorization',responseJson.token);
            } catch(error) {
              console.log(error);
            }
          };
        }),
      }).catch((error) =>{
          console.log(error);
        });
      }

      render(){
      // renders 2 text inputs for the username and password of the user and creates a login button which calls the function above to authenticate against the database
        return(
          <View>
          <TextInput placeholder='Username' onChangeText={text => this.setState({username: text})}></TextInput>
          <TextInput placeholder='Password' secureTextEntry={true} onChangeText={text => this.setState({password: text})}></TextInput>
          <Button 
          title = "Login"
          onPress = {() => {this.POSTData}}
          onPress = {console.log(this.state.username, this.state.password)}
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