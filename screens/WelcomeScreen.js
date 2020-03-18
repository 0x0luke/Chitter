import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
class WelcomeScreen extends Component {
    constructor(props){
      super(props)
      this.state = {
        login: false
      }
    }

    static navigationOptions = {
        header: null
    }
  
    render(){
  
      // renders a screen containing the welcome screen above and a button to login
      return(
        <View>
          <View style={styles.welcomeText}>
            <Image style = {{width: 200, height: 200, marginHorizontal:106, marginTop: 100}}
            source={require('../images/chitterlogo.png')}
            ></Image>
          </View>
            <View>
              <TouchableOpacity
              style={styles.LoginButton}
              title="Login"
              onPress={()=>this.props.navigation.navigate('Login')}>
                <Text style={styles.ButtonTextStyle}>Login</Text>
              </TouchableOpacity> 
            <View>
              <TouchableOpacity
              style={styles.RegisterButton}
              title = "Register"      
              onPress={()=>this.props.navigation.navigate('Register')}>
                <Text style={styles.ButtonTextStyle}>Register</Text>
              </TouchableOpacity>
              </View>

          </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
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
      marginTop:  12,
      marginHorizontal: 84,
      fontSize: 20,
      color:'#ffffff',
      textAlign:'center',
      padding:20,
      backgroundColor: '#202646',
      borderRadius:5
    },
    LoginButton: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 200,
      marginHorizontal: 84,
      fontSize: 20,
      color:'#ffffff',
      textAlign:'center',
      padding:20,
      backgroundColor: '#202646',
      borderRadius:5
    }
  })

export default WelcomeScreen;