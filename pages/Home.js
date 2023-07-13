import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import PostsScreen from "../pages/mainScreen/PostsScreen";
import CreatePostsScreen from "../pages/mainScreen/CreatePostsScreen";
import ProfileScreen from "../pages/mainScreen/ProfileScreen";

// icons
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
        }}
      >
        <MainTab.Screen
          name="Публікації"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <Ionicons
                  name="ios-grid-outline"
                  size={24}
                  color={focused ? "#ffffff" : "#212121"}
                  backgroundColor={focused ? "#FF6C00" : "transparent"}
                  paddingHorizontal={focused ? 25 : null}
                  paddingVertical={focused ? 8 : null}
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                  }}
                />
              );
            },
            headerRight: () => (
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("Login")}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Створити публікацію"
          component={CreatePostsScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <AntDesign
                  name="plus"
                  size={24}
                  color={focused ? "#ffffff" : "#212121"}
                  backgroundColor={focused ? "#FF6C00" : "transparent"}
                  paddingHorizontal={focused ? 25 : null}
                  paddingVertical={focused ? 8 : null}
                  style={{
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                  }}
                />
              );
            },
            headerLeft: (props) => (
              <Feather
                name="arrow-left"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Публікації")}
              />
            ),
            unmountOnBlur: true,
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign
                name="user"
                size={24}
                color={focused ? "#ffffff" : "#212121"}
                backgroundColor={focused ? "#FF6C00" : "transparent"}
                paddingHorizontal={focused ? 25 : null}
                paddingVertical={focused ? 8 : null}
                style={{
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  borderBottomLeftRadius: 100,
                  borderBottomRightRadius: 100,
                }}
              />
            ),
            headerShown: false,
          }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default Home;
