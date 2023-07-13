import CreateAuthNav from "./components/CreateAuthNav";
import CreateTabNav from "./components/CreateTabNav";

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <CreateAuthNav />;
  }
  return <CreateTabNav />;
};

export default useRoute;

// import React from "react";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// import LoginScreen from "./screens/LoginScreen";
// import RegistrationScreen from "./screens/RegistrationScreen";
// import PostsScreen from "./pages/mainScreen/PostsScreen";
// import CreatePostsScreen from "./pages/mainScreen/CreatePostsScreen";
// import ProfileScreen from "./pages/mainScreen/ProfileScreen";

// // icons
// import { Ionicons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

// export const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <AuthStack.Screen
//           options={{ headerShown: false }}
//           name="Registration"
//           component={RegistrationScreen}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
//       <MainTab.Screen
//         options={{
//           tabBarIcon: ({ focused, size, color }) => (
//             // <Ionicons name="ios-grid-outline" size={24} color="black" />
//             <Ionicons
//               name="ios-grid-outline"
//               size={focused ? 13 : 24}
//               color={focused ? "#ffffff" : "#212121"}
//               backgroundColor={focused ? "#FF6C00" : "transparent"}
//               paddingHorizontal={focused ? 25 : null}
//               paddingVertical={focused ? 13 : null}
//               style={{
//                 borderTopLeftRadius: 100,
//                 borderTopRightRadius: 100,
//                 borderBottomLeftRadius: 100,
//                 borderBottomRightRadius: 100,
//               }}
//             />
//           ),
//         }}
//         name="Posts"
//         component={PostsScreen}
//       />
//       <MainTab.Screen
//         options={{
//           tabBarIcon: ({ focused, size, color }) => (
//             <AntDesign name="plus" size={24} color="black" />
//           ),
//         }}
//         name="Create"
//         component={CreatePostsScreen}
//       />
//       <MainTab.Screen
//         options={{
//           tabBarIcon: ({ focused, size, color }) => (
//             <AntDesign name="user" size={24} color="black" />
//           ),
//         }}
//         name="Profile"
//         component={ProfileScreen}
//       />
//     </MainTab.Navigator>
//   );
// };
