import * as React from 'react';
import { 
  Text, View, 
  Image,
  TouchableOpacity, 
  FlatList,
} 
from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

class ListarProductos extends React.Component {
    state = {
      elementos: [],
      total: 0
    }
  
    static navigationOptions = {
      title: 'Productos',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  
    cargarRegistros() {
      console.log('Prueba');
      fetch('https://react-api-rcla.000webhostapp.com/api/api.php?comando=listar', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
          total: listado.length
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    componentDidMount() {
        this._cargar = this.props.navigation.addListener('focus', () => {
            this.cargarRegistros();
        });
    }
    
    componentWillUnmount() {
        this._cargar();
    }
  
    render() {
      return (
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              height: 40,
              marginTop: 10,
              backgroundColor: 'lightgray',
              textAlignVertical: 'center',
              borderRadius: 10,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            {this.state.total} productos
          </Text>
          <FlatList 
            data={this.state.elementos}
            renderItem={({item}) => <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('Detalles', item)}>
              <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 2}}>
                <Image style={{width: 90, height: 90}} source={{uri: item.fotografia}} /> 
                <View style={{height: 80, marginLeft: 5}}>
                  <Text style={{flex: 1, fontSize: 18}}>
                    { item.nombre }
                  </Text>
                  <Text style={{flex: 1, fontSize: 16, fontWeight: 'bold'}}>
                    ${item.preciodeventa}
                  </Text>
                  <Text style={{flex: 1, fontSize: 14}}>
                    Existencia {item.cantidad}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:70,
              position: 'absolute',
              bottom: 10,
              right: 10,
              height:70,
              backgroundColor:'red',
              borderRadius:100,
            }}
            onPress={() => this.props.navigation.navigate('Agregar')}
          >
            <Icon name='plus' size={30} color='white' />
          </TouchableOpacity>
        </View>
      );
    }
}

export default ListarProductos;