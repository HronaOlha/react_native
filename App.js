import React from "react";
import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";

export default function App() {
  const routing = useRoute(null);

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
