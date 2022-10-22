import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, View, 
  SafeAreaView, 
  Button,
  Image,
  TouchableOpacity, 
  Keyboard,
  Alert,
  FlatList,
  ScrollView 
} 
from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class PantallaInicio extends React.Component {
  state = {
    usuario: '',
    contrasena: '',
  }

  static navigationOptions = {
    header: null
  }

  Entrar();

  {
    if (!!this.state.usuario && !!this.state.contrasena) {
      fetch(`https://react-api-rcla.000webhostapp.com/api/apiusuario.php?comando=autenticar&usuario=${this.state.usuario}&contrasena=${this.state.contrasena}`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const encontrado = responseJson.encontrado;

        if (encontrado == 'si') {
          this.props.navigation.navigate('ListarProductos');
        } else {
          Alert.alert(
            'Usuario', 
            '¡No encontrado!',
            [
              { text: 'OK', onPress: () => console.log('Ok Pressed')},
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        Alert.alert();
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
