import { View, TextInput, Button, json } from 'react-native';
import React, {Component} from 'react';


class Register extends Component {
    constructor(props){
      super(props)
  
      this.state = {
        family: '',
        username: '',
        password: '',
        email: ''
      };
    }
    // makes post request to given uri with the states defined above 
    POSTData = () => {
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: json.Stringify ({
            'given_name': this.state.username,
            'family_name': this.state.family,
            'email': this.state.email,
            'password': this.state.password
        })
      }).then((response) => {
          Alert.alert("Account Created!")
      }).catch((error) => {
          console.log(error);
      });
    }
      
      render(){
      // renders 4 text inputs for the username and password of the user and creates a register button to navigate to the register page.
        return(
          <View>
          <TextInput type='text' placeholder='Email' onChangeText={text => this.setState({email: text})}></TextInput>
          <TextInput type='text' placeholder='Username' onChangeText={text => this.setState({username: text})}></TextInput>
          <TextInput type='text' placeholder='Family Name' onChangeText={text => this.setState({family: text})}></TextInput>
          <TextInput type='password' placeholder='Password' secureTextEntry={true} onChangeText={text => this.setState({password: text})}></TextInput>
          <Button
          title="Register"
          onClick={()=> {this.POSTData}}
          onPress={()=> this.props.navigation.navigate('Login')}
          ></Button>
          </View>
        );
      }
  
  
  }

export default Register;