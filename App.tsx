import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "./screens/CardScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#383B3D" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="CardScreen" component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
