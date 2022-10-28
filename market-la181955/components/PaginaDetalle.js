import * as React from 'react';
import { 
  Text, View, 
  ScrollView,
  Image,
  TouchableOpacity, 
} 
from 'react-native';
import { Input } from '@rneui/themed';

class PaginaDetalle extends React.Component {
    state = {
      nombre:'',
      descripcion:'',
      cantidad:'',
      preciodecosto:'',
      preciodeventa:'',
      fotografia:'',
      id:''
    }
  
    static navigationOptions = {
      title: 'Editar producto',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  
    Actualizar() {
      fetch(`https://react-api-rcla.000webhostapp.com/api/api.php?comando=editar&nombre=${this.state.nombre}&descripcion=${this.state.descripcion}&cantidad=${this.state.cantidad}&preciodecosto=${this.state.preciodecosto}&preciodeventa=${this.state.preciodeventa}&fotografia=${this.state.fotografia}&id=${this.state.id}`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('Error al actualizar');
        } else {
          alert(mensaje);
          this.props.navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('¡Error de internet!');
      })
    }
  
    Eliminar() {
      fetch(`https://react-api-rcla.000webhostapp.com/api/api.php?comando=eliminar&id=${this.state.id}`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) {
          alert('¡Error al eliminar!');
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
    
    componentDidMount() {
        this._cargar = this.props.navigation.addListener('focus', () => {
            console.log("Entro aquí "+ this.props.route.params.nombre);
            this.setState({
                nombre: this.props.route.params.nombre,
                descripcion: this.props.route.params.descripcion,
                cantidad: this.props.route.params.cantidad,
                preciodecosto: this.props.route.params.preciodecosto,
                preciodeventa: this.props.route.params.preciodeventa,
                fotografia: this.props.route.params.fotografia,
                id: this.props.route.params.id
            });
        });
    }

    componentWillUnmount() {
        this._cargar();
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                height: 60
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: 'black',
                  borderRadius: 5,
                  justifyContent: 'center',
                  marginLeft: 5
                }}
                onPress = {() => {this.Actualizar()}}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    padding: 3
                  }}
                >
                  Actualizar 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: 'black',
                  borderRadius: 5,
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5
                }}
                onPress={() => {this.Eliminar()}}
              >
                <Text style={{color: 'white', fontSize: 22, textAlign: 'center', textAlignVertical: 'center', padding: 3}}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View> 
            <View style={{flex: 1, padding: 20}}>
              <Input 
                label='Nombre'
                value={this.state.nombre}
                placeholder='Nombre'
                onChangeText={(text) => this.setState({nombre: text})}
              /> 
              <Input 
                label='Descripción'
                value={this.state.descripcion}
                inputStyle={{marginTop: 10}}
                placeholder='Descripción'
                onChangeText={(text) => this.setState({descripcion: text})}
              /> 
              <Input 
                label='Precio de costo'
                value={this.state.preciodecosto}
                inputStyle={{marginTop: 10}}
                placeholder='Precio de costo'
                onChangeText={(text) => this.setState({preciodecosto: text})}
              /> 
              <Input 
                label='Precio de venta'
                value={this.state.preciodeventa}
                inputStyle={{marginTop: 10}}
                placeholder='Precio de venta'
                onChangeText={(text) => this.setState({preciodeventa: text})}
              /> 
              <Input 
                label='Cantidad'
                value={this.state.cantidad}
                inputStyle={{marginTop: 10}}
                placeholder='Cantidad'
                onChangeText={(text) => this.setState({cantidad: text})}
              /> 
              <Input 
                label='Fotografía'
                value={this.state.fotografia}
                inputStyle={{marginTop: 10}}
                placeholder='URL de fotografía'
                onChangeText={(text) => this.setState({fotografia: text})}
              /> 
              <Image 
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center'
                }}
                source={{uri: this.state.fotografia}}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
}

export default PaginaDetalle;