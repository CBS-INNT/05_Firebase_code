import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native';

// Importerer firebase
import "./database/firebase";

// Importerer de tre screens
import CarList from "./screens/CarList";
import CarDetails from "./screens/CarDetails";
import AddEditCar from "./screens/AddEditCar";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Car List" component={CarList} />
      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen name="Edit Car" component={AddEditCar} />
    </Stack.Navigator>
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Hjem"
            component={StackNavigation}
            options={{
              tabBarIcon: () => <Ionicons name="home" size={20} />,
            }}
          />
          <Tab.Screen
            name="Tilføj ny bil"
            component={AddEditCar}
            options={{
              tabBarIcon: () => <Ionicons name="add" size={20} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}