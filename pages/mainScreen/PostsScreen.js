import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <>
      <NestedScreen.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <NestedScreen.Screen
          name="DefaultScreen"
          component={DefaultScreenPosts}
          options={{ title: "Публікації", headerShown: false }}
        />
        <NestedScreen.Screen name="Comments" component={CommentsScreen} />
        <NestedScreen.Screen name="Map" component={MapScreen} />
      </NestedScreen.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default PostsScreen;

// -----------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, Image } from "react-native";

// const PostsScreen = ({ route }) => {
//   const [posts, setPosts] = useState([]);
//   // console.log("route.params", route.params);
//   // console.log("posts", posts);

//   useEffect(() => {
//     if (route.params) {
//       setPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={posts}
//         keyExtractor={(item, indx) => indx.toString()}
//         renderItem={({ item }) => (
//           <View>
//             <Image
//               source={{ uri: item.photo }}
//               style={{ height: 200, width: 200 }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     // alignItems: "center",
//   },
// });

// export default PostsScreen;
