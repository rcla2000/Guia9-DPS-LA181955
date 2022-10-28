import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaInicio from './PantallaInicio';
import ListarProductos from './ListarProductos';
import PaginaAgregar from './PaginaAgregar';
import PaginaDetalle from './PaginaDetalle';

const Navegacion = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Inicio'>
                <Stack.Screen name="Inicio" component={PantallaInicio} />
                <Stack.Screen name="ListarProd" component={ListarProductos} options={{title: 'Productos'}} />
                <Stack.Screen name="Detalles" component={PaginaDetalle} options={{title: 'Detalles  de producto'}} />
                <Stack.Screen name="Agregar" component={PaginaAgregar} options={{title: 'Agregar producto'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navegacion;