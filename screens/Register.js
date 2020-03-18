import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import React, {Component} from 'react';


class Register extends Component {
    constructor(props){
      super(props)

      this.RegisterAccount = this.RegisterAccount.bind(this);
  
      this.state = {
        family: '',
        username: '',
        password: '',
        email: ''
      };
    }

    // makes post request to given uri with the states defined above 
    RegisterAccount() {
      console.log("Function called")
      //craft json data
      const JSONdata = {
        given_name: this.state.username,
        family_name: this.state.family,
        email: this.state.email,
        password: this.state.password
      }
      
      const POSTdata = JSON.stringify(JSONdata);
      
      console.log(POSTdata);
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: POSTdata
        })
        .then((response) => {
          Alert.alert("Account Created!")
          this.props.navigation.navigate('Login')
        }).catch((error) => {
          console.log(error);
        });
      }
      
      render(){
      // renders 4 text inputs for the username and password of the user and creates a register button to navigate to the register page.
        return(
          <View>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='Email' onChangeText={(email) => this.setState({email})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='First Name' onChangeText={(username) => this.setState({username})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='text' placeholder='Last Name' onChangeText={(family) => this.setState({family})}></TextInput>
          <TextInput style={styles.TextInputStyle} type='password' placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})}></TextInput>
          <TouchableOpacity
          title="Register"
          onPress={this.RegisterAccount}
          style={styles.RegisterButton}
          ><Text style={styles.ButtonTextStyle}>Register</Text></TouchableOpacity>
          </View>
        );
      }
  
  
  }

  const styles = StyleSheet.create({

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
    RegisterButton: {
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

export default Register;