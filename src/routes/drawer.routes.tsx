import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'; 
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Home from "../screens/Home";
import Group from "../screens/Group";
import News from "../screens/News";
import Profile from "../screens/Profile";
import Events from '../screens/Events';
import League from '../screens/Leagues';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {

    const [fontsLoaded] = useFonts({
        'CustomFont-Bold': require('../fonts/BaronNeue-Black.otf'), 
    });

    if (!fontsLoaded) {
        return <AppLoading />; 
    }

    return (
        <>
            <StatusBar style="light" hidden={true}/>
            <Drawer.Navigator
                screenOptions={{
                    headerTitleStyle: styles.headerTitle,
                    drawerStyle: styles.drawer,
                    drawerLabelStyle: styles.drawerLabel,
                    title: 'Racing Club',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: 'white' },
                }}
                id={undefined}
                >
                <Drawer.Screen
                    name='inicio'
                    component={Home}
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Feather
                                name="home"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Inicio',
                    }}
                />
                <Drawer.Screen 
                    name="Eventos" 
                    component={Events} 
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Feather
                                name="star"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Eventos',
                    }} 
                /> 
                <Drawer.Screen 
                    name="Ligas" 
                    component={League} 
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <FontAwesome5
                                name="flag-checkered"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Ligas',
                    }} 
                /> 
                <Drawer.Screen 
                    name="Noticias" 
                    component={News} 
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Feather
                                name="book"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Noticias',
                    }}
                />
                <Drawer.Screen 
                    name="Grupos" 
                    component={Group} 
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Feather
                                name="users"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Grupos',
                    }} 
                />
                <Drawer.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        drawerIcon: ({ size, color }) => (
                            <Feather
                                name="user"
                                size={size}
                                color={color}
                            />
                        ),
                        drawerLabel: 'Profile',
                    }}
                />
            </Drawer.Navigator>
        </>
    );
}

const styles = {
    headerTitle: {
        fontSize: 26, 
        fontFamily: 'CustomFont-Bold',
        color: '#000', 
        BackgroundColor: 'purple',
    },
    drawer: {
        backgroundColor: '#fff', 
    },
    drawerLabel: {
        fontSize: 16, 
        color: '#000', 
        
    },
};
