import React, {Component} from 'react';
import { Text, View, ActivityIndicator,Alert, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

class HomePage extends Component {
    constructor(props){
        super(props);

        // binds the functions so they're able to access the state.
        this.getPosts = this.getPosts.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderChits = this.renderChits.bind(this);
        this._onRefresh = this._onRefresh.bind(this);

        this.state = {
          login: true,
          authkey: '',
          loading: true,
          jsonData: [],
          refreshing: false,
        }
        
      }

      async getCreds(){
        try{
          var getAuthKey = await AsyncStorage.getItem('X-Authorization');

          console.log(getAuthKey);

          this.setState({ 
            authkey: getAuthKey
         });
        }
        catch(error){
          console.log("Error within Async: "+error);
          Alert.alert("There was an issue with getting authentication data from the storage...");
        }
      }

      getPosts(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=200')
       .then((response) => response.json())
       .then((responseJson) => {
      
        this.setState({
         loading: false,
         jsonData: responseJson,
        });
         
       })
       .catch((error) =>{
        console.log(error);
       });
      }

      

      // waits to see until the compoment is opened, then runs the function to get the chits from the API
      componentDidMount() {
        this.getCreds();
        this.getPosts();
      }

      // this function crafts an object for each chit so it can be rendered in a view.
      renderChits(item){
        return(
          <View style={style.ChitContainer}>
              <SafeAreaView style={style.scrollable}>
                <Text style={style.NameStyle}>{item.user.given_name + " "+ item.user.family_name}</Text>
                <Text style={style.LocationAndChitStyle}>{item.chit_content}</Text>
                <Text style={style.LocationAndChitStyle}>{item.location}</Text>
              </SafeAreaView>
          </View>
        );
      }

      _onRefresh(){
        this.setState({
          refreshing: true,
          jsonData: [],
        });
        this.getPosts().then(() => {
          this.setState({
            refreshing: false
          });
        });
      }

// actual render function
      render(){

        // this algorithm displays a loading symbol until all the chits have been pulled down from the API and processed on the device.
            if(this.state.loading){
              console.log("We're in a loading state")
              return(
                <View>
                  <ActivityIndicator/>
                </View>
                )
              }
              
              
              // this return makes it so each chit returned from the API is displayed on the page.
              return(
              <View>
                <ScrollView
                refreshControl={
                  <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  />
                }>
                  {this.state.jsonData.map(item => this.renderChits(item))}
                </ScrollView>
              </View>
              
          );
      }

}

const style = StyleSheet.create(
  {
    ChitContainer:{
      flex:1,
      marginTop: Constants.statusBarHeight,
    },
    scrollable:
    {
      marginBottom:5,
      borderWidth: 2,
      borderColor:'#202646',
      borderRadius: 20,
      //marginHorizonal: 20
    },
    NameStyle:{
      fontSize:18,
      marginLeft:8,
      marginTop:5,
    },
    LocationAndChitStyle:{
      fontSize:14,
      marginLeft: 8,
    },
    ButtonTextStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:20,
      textAlign: 'center',
      color:'#ffffff',
    },
    PostChitButton: {
      flex: 1,
      justifyContent: 'center',
      marginBottom: 36,
      //marginTop:  70,
      marginHorizontal: 84,
      fontSize: 20,
      color:'#ffffff',
      textAlign:'center',
      padding:20,
      backgroundColor: '#202646',
      borderRadius:5
    },
  }
)
export default HomePage;