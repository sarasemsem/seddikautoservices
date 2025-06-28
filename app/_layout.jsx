import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "@/lib/authContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClientsProvider } from "../lib/ClientsContext";
import { StockProvider } from "../lib/StockContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-ExtraBold': require('../assets/fonts/Outfit-ExtraBold.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'BebasNeue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'lobster': require('../assets/fonts/Lobster-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider> 
          <ClientsProvider>
            <StockProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </StockProvider>
          </ClientsProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
