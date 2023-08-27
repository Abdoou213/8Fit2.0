import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import Log from "./Log";
import ViewPastSession from "./ViewPastSession";


const LogStack = createStackNavigator<RootStackParamList>();

const LogScreenStack = () => {
  return (
    <LogStack.Navigator>
      <LogStack.Screen name="Log" component={Log} options={{ headerShown: false }} />
      <LogStack.Screen name="ViewPastSession" component={ViewPastSession} options={{ headerShown: false }} />
    </LogStack.Navigator>
  );
};
export default LogScreenStack;