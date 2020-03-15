import React, {Compoment, AsyncStorage} from 'react';
import { Text, View, FlatList } from 'react-native';


/* json response format
[
  {
    "chit_id": 0,
    "timestamp": 0,
    "chit_content": "string",
    "location": {
      "longitude": 0,
      "latitude": 0
    },
    "user": {
      "user_id": 0,
      "given_name": "string",
      "family_name": "string",
      "email": "string"
    }
  }
] */

class HomePage extends Compoment {
    constructor(props){
        super(props)

        this.state = {
          login: true,
          authkey: '',
          chits: '',
          loading: true,
        }
        
      }

      getPosts = () => {
        var auth = AsyncStorage.getItem("X-Authorization");

        this.setState({ authkey: auth });

        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Authorization': this.state.authkey,
          },
        }).then((response) => {
          if ((response) != null) {
            console.log(response);
            this.setState({
            chits: JSON.stringify(response),
            loading:false
            })
          }
        }).catch((error) => {
            console.log(error);
        });
      }

      compomentDidMount() {
        this.getPosts();
      }
    
    render(){
        return(
            <View>
              <FlatList>
                key = {item => item.id}
                data = {this.state.chits.chit_content}
              </FlatList>
            </View>
        );
    }

}
export default HomePage;