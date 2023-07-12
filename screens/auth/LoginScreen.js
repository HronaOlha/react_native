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

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardHideFromBtn = () => {
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
            justifyContent: isShowKeyboard ? "flex-end" : "flex-end",
          }}
          source={require("../../assets/images/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 111,
              }}
              // style={styles.form}
            >
              <Text style={styles.inputTitle}>Увійти</Text>

              <View>
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
                onPress={keyboardHideFromBtn}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.link}>Немає акаунту? Зареєструватися</Text>
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
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    // backgroundColor: "#F6F6F6",
    height: 50,
    padding: 16,
    fontSize: 16,
  },

  form: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 111,

    paddingHorizontal: 16,
  },
  inputTitle: {
    marginBottom: 32,
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
