import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
      let welcomeString = "Chitter";
  
      // renders a screen containing the welcome screen above and a button to login
      return(
        <View>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeText}>{welcomeString}</Text>
          </View>
          
          <View style={styles.LoginButton}>
            <Button
            title="Login"
            style={styles.LoginButton}
            onPress={() => this.props.navigation.navigate('Login')}></Button> 
          <View style={styles.RegisterButton}>
            <Button
            title = "Register"
            style={styles.RegisterButton}
            onPress={()=> this.props.navigation.navigate('Register')}></Button></View>

          </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    welcomeTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      //Color: 'black',
      width: 200,
      height: 400,
    },
    welcomeText:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:32,
    },
    RegisterButton: {
      flexDirection:'row',
      justifyContent: 'flex-end',
      marginBottom: 36,
      right: 0,
      bottom:0,
    },
    LoginButton: {
      alignItems:'center',
      flexDirection:'row',
      justifyContent: 'space-between',
      left:0,
      bottom:0,
    }
  })

export default WelcomeScreen;