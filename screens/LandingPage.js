import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.getCreds = this.getCreds.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);

        this.state = {
            username: '',
            login: true,
            udid: '',
        }

    }

    
    async getCreds(){
        try{
          var id = await AsyncStorage.getItem('id');

          console.log(id);

          this.setState({ 
            udid: id
         });

         this.getUserDetails(id);
        }
        catch(error){
          console.log("Error within Async: "+error);
        }
      }

      getUserDetails(id){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id)
       .then((response) => response.json())
       .then((responseJson) => {

        this.setState({
         loading: false,
         username: responseJson.given_name,
        });
       })
       .catch((error) =>{
        console.log(error);
       });
      }

 
    componentDidMount(){
        this.getCreds();
        
    }


    render(){
        return(
            <View>
                <Text style={style.welcomeMessage}>Welcome, {this.state.username}</Text>
                <TouchableOpacity
                    style={style.ReadChitStyle}
                    title="HomePage"
                    onPress={()=>this.props.navigation.navigate('HomePage')}>
                <Text style={style.ButtonTextStyle}>Read your Chits</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.PostChitStyle}
                    title="PostChit"
                    onPress={()=>this.props.navigation.navigate('PostChit')}>
                <Text style={style.ButtonTextStyle}>Post a Chit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.PostChitStyle}
                    title="PostChit"
                    onPress={()=>this.props.navigation.navigate('PostChit')}>
                <Text style={style.ButtonTextStyle}>Post a Chit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.EditAccButtStyle}
                    title="Edit Account"
                    onPress={()=>this.props.navigation.navigate('AccountEdit')}>
                <Text style={style.ButtonTextStyle}>Edit Account Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.LogoutButtStyle}
                    title="Logout"
                    onPress={()=>this.props.navigation.navigate('WelcomeScreen')}>
                <Text style={style.ButtonTextStyle}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }


}


const style = StyleSheet.create(
    {
        ReadChitStyle: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 206,
            marginHorizontal: 84,
            fontSize: 20,
            color:'#ffffff',
            textAlign:'center',
            padding:20,
            backgroundColor: '#202646',
            borderRadius:5
          },
          PostChitStyle: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 24,
            marginHorizontal: 84,
            fontSize: 20,
            color:'#ffffff',
            textAlign:'center',
            padding:20,
            backgroundColor: '#202646',
            borderRadius:5
          },
          EditAccButtStyle: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 24,
            marginHorizontal: 84,
            fontSize: 20,
            color:'#ffffff',
            textAlign:'center',
            padding:20,
            backgroundColor: '#202646',
            borderRadius:5
          },
          LogoutButtStyle: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 24,
            marginHorizontal: 84,
            fontSize: 20,
            color:'#ffffff',
            textAlign:'center',
            padding:20,
            backgroundColor: '#202646',
            borderRadius:5
          },
          ButtonTextStyle:{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:20,
            textAlign: 'center',
            color:'#ffffff',
          },
          welcomeMessage: {
              marginTop:34,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 32,

          }
    },
)


export default LandingPage;