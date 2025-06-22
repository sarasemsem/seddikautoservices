import { Redirect } from "expo-router";

export default function Index() {

    //return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  

  return <Redirect href={"/SplashScreen"} />;
}
