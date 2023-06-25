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
  login: "",
  email: "",
  password: "",
};

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);

    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("./assets/images/bg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              // TODO: 100 px???????? doesnt work
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 32 : 0,
              }}
              // style={styles.form}
            >
              <Text style={styles.inputTitle}>Реєстрація</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
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
                  style={styles.input}
                  placeholder="Адресa електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
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
                  style={styles.input}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={keyboardHide}
              >
                <Text style={styles.btnText}>Зареєструватися</Text>
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
    justifyContent: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    padding: 16,
    fontSize: 16,
  },
  form: {
    marginHorizontal: 16,
  },
  inputTitle: {
    marginBottom: 33,
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
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
});
