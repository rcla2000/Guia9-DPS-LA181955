import * as React from 'react';
import { 
  Text, View, 
  ScrollView,
  TouchableOpacity, 
} 
from 'react-native';
import { Input } from '@rneui/themed';

class PaginaAgregar extends React.Component {
    state = {
      nombre:'',
      descripcion:'',
      preciodeventa:'',
      preciodecosto:'',
      cantidad:'',
      fotografia:'',
    }
  
    static navigationOptions = {
      title: 'Agregar producto',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  
    Guardar() {
      fetch(`https://react-api-rcla.000webhostapp.com/api/api.php?comando=agregar&nombre=${this.state.nombre}&descripcion=${this.state.descripcion}&cantidad=${this.state.cantidad}&preciodecosto=${this.state.preciodecosto}&preciodeventa=${this.state.preciodeventa}&fotografia=${this.state.fotografia}&id=${this.state.id}`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('¡Error al agregar!');
        } else {
          alert(mensaje);
          this.props.navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('¡Error de internet!');
      });
    }
  
    render () {
      return (
        <View style={{flex: 1, padding: 20}}>
          <Input 
            placeholder='Nombre'
            onChangeText={(text) => this.setState({nombre: text})}
          />
          <Input
            inputStyle={{marginTop:10}}
            placeholder='Descripción'
            onChangeText = {(text) => this.setState({descripcion: text})}
          />
          <Input
            inputStyle={{marginTop:10}}
            placeholder='Precio de costo'
            onChangeText = {(text) => this.setState({preciodecosto: text})}
          />
          <Input
            inputStyle={{marginTop:10}}
            placeholder='Precio de venta'
            onChangeText = {(text) => this.setState({preciodeventa: text})}
          />
          <Input
            inputStyle={{marginTop:10}}
            placeholder='Cantidad'
            onChangeText = {(text) => this.setState({cantidad: text})}
          />
          <Input
            inputStyle={{marginTop:10}}
            placeholder='URL de fotografía'
            onChangeText = {(text) => this.setState({fotografia: text})}
          />
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor:'red',
              marginTop:15,
              borderRadius:5,
              justifyContent: 'center',
              marginLeft:20,
              marginRight:20
            }}
            onPress={() => {this.Guardar()}}
          >
            <Text 
              style={{
                color:'white',
                fontSize:22,
                textAlign:'center',
                textAlignVertical:'center'
              }}
            >
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
}

export default PaginaAgregar;