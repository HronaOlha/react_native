import React from "react";
import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
// import { useAuth } from "../hooks/useAuth";

export default function App() {
  // const { isLogedIn } = useAuth();
  const routing = useRoute(null);

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
}
