import { Fontisto, Feather, Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [geolocation, setGeoLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      if (coords === null) {
        return;
      }
      setGeoLocation(coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (geolocation) {
    text = JSON.stringify(geolocation);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const closeImage = () => {
    setImage(null);
  };

  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.takePictureAsync();

      await MediaLibrary.createAssetAsync(uri);
      console.log(geolocation);
      setPhoto(uri);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPost = () => {
    navigation.navigate("DefaultScreen", {
      photo: photo || image,
      name,
      location,
    });

    setName("");
    setLocation("");
  };

  const deletePost = () => {
    setName("");
    setLocation("");
    setImage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerCamera}>
          <Camera style={styles.camera} ref={setCameraRef} type={type}>
            <View style={styles.containerImage}>
              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              )}
            </View>

            {!image && (
              <TouchableOpacity
                style={{
                  ...styles.containerSnap,
                  backgroundColor: photo
                    ? "rgba(255, 255, 255, 0.30)"
                    : "#FFFFFF",
                }}
                onPress={takePhoto}
              >
                <Fontisto
                  name="camera"
                  size={24}
                  color={photo ? "#FFFFFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            )}

            {!image && (
              <TouchableOpacity
                style={styles.containerToggleTypeCamera}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="md-camera-reverse" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </Camera>
          {image && (
            <ImageBackground
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "66%",
                position: "absolute",
              }}
            ></ImageBackground>
          )}
          <View style={styles.containerLoadImage}>
            <TouchableOpacity onPress={!image ? addImage : closeImage}>
              <Text style={{ color: "#BDBDBD", marginBottom: 20 }}>
                {photo || image ? "Редагувати фото" : "Завантажте фото"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <TextInput
                placeholder="Назва..."
                required
                value={name}
                onChangeText={setName}
                style={{ width: "100%" }}
              />
            </View>
            <View style={styles.input}>
              <Feather
                name="map-pin"
                size={24}
                color="#BDBDBD"
                style={{ paddingRight: 4 }}
              />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Місцевість..."
                required
                style={{ width: "100%" }}
              />
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor:
                  (name && location && photo) || image ? "#FF6C00" : "#BDBDBD",
              }}
              onPress={sendPost}
            >
              <Text style={styles.textButton}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.bgIcon} onPress={deletePost}>
            <Feather name="trash-2" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerCamera: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  containerSnap: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerToggleTypeCamera: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  containerImage: {
    position: "absolute",
    top: 3,
    left: 3,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
  },
  containerLoadImage: {
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    borderStyle: "solid",
    marginVertical: 10,
    paddingVertical: 15,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
    marginTop: 23,
  },
  textButton: {
    color: "#ffffff",
  },
  bgIcon: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BDBDBD",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: 34,
  },
});

export default CreatePostsScreen;

// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Camera } from "expo-camera";
// import * as Location from "expo-location";

// import { Fontisto, Feather, Ionicons } from "@expo/vector-icons";

// const CreatePostsScreen = ({ navigation }) => {
//   const [snap, setSnap] = useState(null);
//   const [photo, setPhoto] = useState(null);

//   const takePhoto = async () => {
//     const photo = await snap.takePictureAsync();
//     Location.requestForegroundPermissionsAsync();
//     const location = await Location.getCurrentPositionAsync();
//     console.log("location", location);
//     setPhoto(photo.uri);
//   };

//   const sendPhoto = () => {
//     navigation.navigate("DefaultScreen", { photo });
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setSnap}>
//         {photo && (
//           <View style={styles.takePhotoContainer}>
//             <Image
//               source={{ uri: photo }}
//               style={{ width: 100, height: 100, borderRadius: 10 }}
//             />
//           </View>
//         )}
//         <TouchableOpacity style={styles.snapBtn} onPress={takePhoto}>
//           <Text>
//             <Fontisto name="camera" size={24} color={"#FFFFFF"} />
//           </Text>
//         </TouchableOpacity>
//       </Camera>
//       <TouchableOpacity
//         style={{
//           ...styles.button,
//           backgroundColor: "#FF6C00",
//           //   (name && location && photo) || image ? "#FF6C00" : "#BDBDBD",
//         }}
//         onPress={sendPhoto}
//       >
//         <Text style={styles.textButton}>Опублікувати</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: 16,
//   },
//   camera: {
//     height: 300,
//     // backgroundColor: "black",
//     marginTop: 32,
//     borderRadius: 10,

//     justifyContent: "center",
//     alignItems: "center",
//   },
//   snapBtn: {
//     padding: 25,
//     backgroundColor: "rgba(255, 255, 255, 0.30)",
//     borderRadius: 100,
//   },
//   takePhotoContainer: {
//     position: "absolute",
//     top: 3,
//     left: 3,
//     borderColor: "#FFFFFF",
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   button: {
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 100,
//     marginTop: 23,
//   },
//   textButton: {
//     color: "#ffffff",
//   },
// });

// export default CreatePostsScreen;
