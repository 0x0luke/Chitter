import React, {Component} from 'react';
import { Text, View, ActivityIndicator,Alert, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

class Followers extends Component {
    constructor(props){
        super(props);

        // binds the functions so they're able to access the state.
        this.getFollowers = this.getFollowers.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderFollowers = this.renderFollowers.bind(this);
        this._onRefresh = this._onRefresh.bind(this);

        this.state = {
          login: true,
          id: '',
          authkey: '',
          loading: true,
          Followers: [],
          refreshing: false,
        }
        
      }

      async getCreds(){
        try{
          var udid = await AsyncStorage.getItem('id');
          var getAuthKey = await AsyncStorage.getItem('X-Authorization');

          console.log(getAuthKey);

          this.setState({ 
            id: udid,
            authkey: getAuthKey
         });
        }
        catch(error){
          console.log("Error within Async: "+error);
          Alert.alert("There was an issue with getting authentication data from the storage...");
        }
      }

      getFollowers(id){

        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id+'/followers', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token,
          },
        })
          .then((response) => {
              if(response.status != 200)
              {
                throw("Response error: " + response.status);
              }
            }).then((responseJson) => {
                this.setState({
                    Followers: [],
                })
            })
            .catch((error) => {
                console.log(error);
            });
      }

      

      // waits to see until the compoment is opened, then runs the function to get the chits from the API
      componentDidMount() {
        this.getCreds();
        this.getFollowers(this.state.id);
      }

      // this function crafts an object for each chit so it can be rendered in a view.
      renderFollowers(item){
        return(
          <View style={style.ChitContainer}>
              <SafeAreaView style={style.scrollable}>
                <Text style={style.NameStyle}>{item.given_name + " " + item.family_name + "\n" +item.email}</Text>
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
                  {this.state.jsonData.map(item => this.renderFollowers(item))}
                </ScrollView>
              </View>
              
          );
      }

}

const style = StyleSheet.create(
  {
    FollowersContainer:{
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

  }
)
export default Followers;