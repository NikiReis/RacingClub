import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen"; 

import Home from "../screens/Home";
import Events from "../screens/Events";
import EventDetails from "../screens/EventDetails"; 
import TrackDetails from "../screens/TrackDetails"; 
import Tracks from "../screens/Tracks";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headerTitle}>Racing Club</Text>
          </View>
        ),
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "white" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          tabBarLabel: "Inicio",
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={Events}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="star" color={color} size={size} />,
          tabBarLabel: "Eventos",
        }}
      />
        <Tab.Screen
            name="Kartódromos"
            component={Tracks} 
            options={{
          tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
          tabBarLabel: "Kartódromos",
        }}
      />

    </Tab.Navigator>
  );
}

export default function AppRoutes() {
  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("../fonts/BaronNeue-Black.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <>
      <StatusBar style="light" hidden={true} />
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabRoutes}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{
            headerTitle: "Detalhes do Evento",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { fontFamily: "CustomFont-Bold", fontSize: 20 },
          }}
        />
        <Stack.Screen
          name="TrackDetails"
          component={TrackDetails}
          options={{
            headerTitle: "Detalhes do Kartódromo",
            headerStyle: { backgroundColor: "white" },
            headerTitleStyle: { fontFamily: "CustomFont-Bold", fontSize: 20 },
          }}
        />
        
      </Stack.Navigator>
    </>
  );
}

const styles = {
  headerTitle: {
    fontSize: 20,
    fontFamily: "CustomFont-Bold",
    color: "#000",
  },
  drawer: {
    backgroundColor: "#fff",
  },
  drawerLabel: {
    fontSize: 16,
    color: "#000",
  },
};
