import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import LogScreen from "../Log";
import ViewPastSession from "../ViewPastSession";

const LogStack = createStackNavigator<RootStackParamList>();

const LogScreenStack = () => {
  return (
    <LogStack.Navigator>
      <LogStack.Screen name="LogScreen" component={LogScreen} options={{ headerShown: false }} />
      <LogStack.Screen name="ViewPastSession" component={ViewPastSession} options={{ headerShown: false }} />
    </LogStack.Navigator>
  );
};
export default LogScreenStack;