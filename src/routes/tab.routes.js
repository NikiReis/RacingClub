import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'; // Para lidar com a tela de carregamento

import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Leagues from "../screens/Leagues";
import Events from "../screens/Events";
import News from "../screens/News";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabRoutes() {
    return (
        <Tab.Navigator 
            screenOptions={({ navigation }) => ({ // Recebe navigation dinamicamente
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.headerTitle}>Racing Club</Text>
                    </View>
                ),
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: 'white' },
                headerLeft: () => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Profile Account')} // Navega para a tela Profile
                        style={{ marginLeft: 20 }}
                    >
                        <Feather name='user' size={24} color='#000' />
                    </TouchableOpacity>
                ),
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                    tabBarLabel: 'Inicio',
                }}
            />
            <Tab.Screen 
                name="Eventos" 
                component={Events} 
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='star' color={color} size={size} />,
                    tabBarLabel: 'Eventos',
                }}
            />
            <Tab.Screen 
                name="Agendar" 
                component={Home} 
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='plus' color={color} size={size} />,
                    tabBarLabel: 'Agendar',
                }}
            />
            <Tab.Screen 
                name="Noticias" 
                component={News} 
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='book' color={color} size={size} />,
                    tabBarLabel: 'Noticias',
                }}
            />
            <Tab.Screen 
                name="Ligas" 
                component={Leagues} 
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name='flag-checkered' color={color} size={size} />,
                    tabBarLabel: 'Ligas',
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppRoutes() {
    const [fontsLoaded] = useFonts({
        'CustomFont-Bold': require('../fonts/BaronNeue-Black.otf'), 
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Aguarde enquanto as fontes são carregadas
    }

    return (
        <>
            <StatusBar style="light" hidden={true} />
            <Stack.Navigator>
                {/* Tab Navigator */}
                <Stack.Screen 
                    name="MainTabs" 
                    component={TabRoutes} 
                    options={{ headerShown: false }} // Remove o cabeçalho extra do Stack
                />
                {/* Tela adicional */}
                <Stack.Screen 
                    name="Profile Account" 
                    component={Profile} 
                    options={{
                        headerTitle: "Perfil",
                        headerStyle: { backgroundColor: 'white' },
                        headerTitleStyle: { fontFamily: 'CustomFont-Bold', fontSize: 20 },
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

const styles = {
    headerTitle: {
        fontSize: 20, 
        fontFamily: 'CustomFont-Bold',
        color: '#000', 
    },
    drawer: {
        backgroundColor: '#fff', 
    },
    drawerLabel: {
        fontSize: 16, 
        color: '#000', 
    },
};
