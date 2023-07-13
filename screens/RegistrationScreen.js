import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import SvgComponent from "../assets/images/addIcon";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const signIn = () => {
    navigation.navigate("Home");

    keyboardHide();
    setState(initialState);
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{
            ...styles.img,
            justifyContent: isShowKeyboard ? "center" : "flex-end",
          }}
          source={require("../assets/images/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.addPhoto}>
              <TouchableOpacity style={styles.addIcon}>
                <SvgComponent />
              </TouchableOpacity>
            </View>

            <View
              // style={{
              //   ...styles.form,
              //   marginBottom: isShowKeyboard ? 32 : 0,
              // }}
              style={styles.form}
            >
              <Text style={styles.inputTitle}>Реєстрація</Text>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: focus.name ? "#fff" : "#F6F6F6",
                    borderColor: focus.name ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  onBlur={() => {
                    setFocus((state) => ({ ...state, name: false }));
                    setIsShowKeyboard(false);
                  }}
                  onFocus={() => {
                    setFocus((state) => ({ ...state, name: true }));
                    setIsShowKeyboard(true);
                  }}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: focus.email ? "#fff" : "#F6F6F6",
                    borderColor: focus.email ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Адресa електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  onBlur={() => {
                    setFocus((state) => ({ ...state, email: false }));
                    setIsShowKeyboard(false);
                  }}
                  onFocus={() => {
                    setFocus((state) => ({ ...state, email: true }));
                    setIsShowKeyboard(true);
                  }}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: focus.password ? "#fff" : "#F6F6F6",
                    borderColor: focus.password ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isPasswordHidden}
                  onBlur={() => {
                    setFocus((state) => ({ ...state, password: false }));
                    setIsShowKeyboard(false);
                  }}
                  onFocus={() => {
                    setFocus((state) => ({ ...state, password: true }));
                    setIsShowKeyboard(true);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <Text
                  style={styles.showPassword}
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? "Показати" : "Заховати"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                disabled={
                  state.name !== "" &&
                  state.email !== "" &&
                  state.password !== ""
                    ? false
                    : true
                }
                onPress={signIn}
              >
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    padding: 16,
    fontSize: 16,
  },
  addPhoto: {
    position: "absolute",
    zIndex: 2,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addIcon: {
    zIndex: 5,
    position: "absolute",
    bottom: 14,
    left: "90%",
  },
  form: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 78,

    paddingHorizontal: 16,
    width: "100%",
  },
  inputTitle: {
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
  },
  showPassword: {
    fontSize: 16,
    position: "absolute",
    top: 16,
    right: 16,
    lineHeight: 18.75,
    color: "#1B4371",
  },
  button: {
    marginTop: 43,

    borderRadius: 100,
    backgroundColor: "#FF6C00",

    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    marginVertical: 16,
  },
  link: {
    marginTop: 16,
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
