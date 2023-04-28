// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <ImageBackground
        style={styles.img}
        source={require("./assets/images/bg-image.jpg")}
      >
        <View style={styles.form}>
          <Text style={styles.inputTitle}>Реєстрація</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={true}
            />
          </View>
          <Button title="Зареєструватися" style={styles.button} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    // color: "#BDBDBD",
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
    // padding: "16 32",
    paddingVertical: 50,
    paddingHorizontal: 32,
    // height: 51,
    borderRadius: 4,
  },
});
