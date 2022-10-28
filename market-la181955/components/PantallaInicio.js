import * as React from 'react';
import { 
  Text, View, 
  Image,
  TouchableOpacity, 
  Alert
} 
from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { Input } from '@rneui/themed';

class PantallaInicio extends React.Component {
    state = {
      usuario: '',
      contrasena: '',
    }
  
    static navigationOptions = {
      header: null
    }
  
    Entrar() {
      if (!!this.state.usuario && !!this.state.contrasena) {
        fetch(`https://react-api-rcla.000webhostapp.com/api/apiusuario.php?comando=autenticar&usuario=${this.state.usuario}&contrasena=${this.state.contrasena}`, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          const encontrado = responseJson.encontrado;
  
          if (encontrado == 'si') {
            this.props.navigation.navigate('ListarProd');
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
          Alert.alert(
            'Aviso',
            '¡Error de internet!',
            [
              { text: 'OK', onPress: () => console.log('OK pressed') },
            ],
            { cancelable: false }
          );
        });
      } else {
        Alert.alert(
          'Aviso',
          'No introdujo datos',
          [
            { text: 'OK', onPress: () => console.log('Ok pressed') },
          ],
          { cancelable: false }
        );
      }
    }
  
    render () {
      return (
        <View style={{flex: 1, padding: 10}}>
          <Text style={{fontSize: 34, marginTop: 25, alignSelf: 'center'}}>
            Bienvenidos
          </Text>
          <Image 
            style={{width: 200, height: 160, alignSelf: 'center', marginTop: 15}} 
            source={require('../assets/img/icon.png')}
          />
          <View style={{marginLeft: 10, marginRight: 10}}>
            <Input 
              placeholder='USUARIO'
              onChangeText = { (text) => this.setState({usuario: text})}
              rightIcon = {
                <Icon name='user' size={24} color='black' />
              }
            />
            <Input 
              placeholder='CONTRASEÑA'
              onChangeText = { (text) => this.setState({contrasena: text})}
              secureTextEntry = {true}
              rightIcon = {
                <Icon name='lock' size={24} color='black' />
              }
            />
          </View>
  
          <TouchableOpacity
            style={{height: 50, backgroundColor: 'red', marginTop: 15, borderRadius: 5, justifyContent: 'center', marginLeft: 20, marginRight: 20}}
            onPress = {() => {this.Entrar()}}
          >
            <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>Entrar</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

export default PantallaInicio;
  