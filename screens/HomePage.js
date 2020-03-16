import React, {Compoment, AsyncStorage} from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

class HomePage extends Compoment {
    constructor(props){
        super(props)

        // binds the functions so they're able to access the state.
        this.getPosts() = this.getPosts.bind(this);
        this.compomentDidMount() = this.compomentDidMount.bind(this);
        this.renderChits(obj) = this.renderChits.bind(this);

        this.state = {
          login: true,
          authkey: '',
          chits: '',
          loading: true,
          jsonData: '',
        }
        
      }

      //gets chits from api
  getPosts = () => {
      var auth = AsyncStorage.getItem("X-Authorization");

      this.setState({ 
         authkey: auth 
      });

      return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=50', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': this.state.authkey,
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if ((response) != null) {
            console.log(response);
            this.setState({
              jsonData: responseJson,
              loading: false,
            })
          }
        }).catch((error) => {
            console.log(error);
        });
      };

      // waits to see until the compoment is opened, then runs the function to get the chits from the API
      compomentDidMount() {
        this.getPosts();
      }

      // this function crafts an object for each chit so it can be rendered in a view.
      renderChits(obj){
        return(

          <View>
            <View>
              <Text>{item.user.given_name}</Text>
              <Text>{item.user.family_name}</Text>
              <Text>{item.chit_content}</Text>
              <Text>{item.location}</Text>
            </View>
          </View>
        );
      }

// actual render function
      render(){

        // this algorithm displays a loading symbol until all the chits have been pulled down from the API and processed on the device.
            if(this.state.loading){
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
export default HomePage;