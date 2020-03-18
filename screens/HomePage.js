import React, {Component} from 'react';
import { Text, View, ActivityIndicator,Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomePage extends Component {
    constructor(props){
        super(props);

        // binds the functions so they're able to access the state.
        this.getPosts = this.getPosts.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderChits = this.renderChits.bind(this);
        this.state = {
          login: true,
          authkey: '',
          loading: true,
          jsonData: [],
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
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
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
        console.log("renderChits called...")
        return(
          <View>
            <View>
              <SafeAreaView style={style.scrollable}>
                <Text>{item.user.given_name}</Text>
                <Text>{item.user.family_name}</Text>
                <Text>{item.chit_content}</Text>
                <Text>{item.location}</Text>
              </SafeAreaView>
              </View>

            <View>
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostChit')}
              title="Post Chit"
              style={style.PostChitButton}
              ><Text style={style.ButtonTextStyle}>Post Chit</Text></TouchableOpacity>
            </View>
            </View>
        );
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
                {this.state.jsonData.map(item => this.renderChits(item))}
              </View>
              
          );
      }

}

const style = StyleSheet.create(
  {
    scrollable:
    {
      marginBottom:100,
      //marginHorizonal: 20
    },
    ButtonTextStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      fontSize:20,
      textAlign: 'center',
      color:'#ffffff',
    },
    PostChitButton: {
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
  }
)
export default HomePage;