import { View, TextInput, Button, json } from 'react-native';
import React, {Component} from 'react';

class Register extends Component {
    constructor(props){
      super(props)
  
      this.state = {
        username: '',
        password: '',
        email: ''
      };
    }
    // makes post request to given uri with the states defined above 
    POSTData(uri){
      return fetch('http://10.0.2.2:3333/'+uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: json.Stringify ({
            'email': this.state.email,
            'username': this.state.username,
            'password': this.state.password
        }),
      }).catch((error) =>{
          console.log(error);
        });
      }
      
      render(){
      // renders 2 text inputs for the username and password of the user and creates a login button which calls the function above to authenticate against the database
        return(
          <View>
          <TextInput onChangeText={text => this.setState({email: text})}>Email: </TextInput>
          <TextInput onChangeText={text => this.setState({username: text})}>Username: </TextInput>
          <TextInput onChangeText={text => this.setState({password: text})}>Password: </TextInput>
          <Button 
          title = "Login"
          onPress = {() => this.POSTData(Login)}
          //onPress = {console.log(this.state.username, this.state.password)}
          ></Button>
          </View>
        );
      }
  
  
  }

export default Register;