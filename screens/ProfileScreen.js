import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../firebase";
import React, { useState, useEffect, setState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { userRefid } from "./LoginScreen";
import Back from "../assets/back.svg";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";

//create a go back page. --navigates to homescreen.
// save button --writes to firebase

const ProfileScreen = () => {
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isUploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const currentUser = useAuth();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    updateProfile(currentUser, {
      photoURL: image,
    })
      .then(() => setUploading(false))
      .catch((e) => console.log("Update profile failed"));
  }, [image]);

  useFocusEffect(() => {
    setImage(currentUser?.photoURL);
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    setImagePreview(result.assets[0].uri);
    handleImagePicked(result);
  };

  const takeImage = async () => {
    await requestPermission();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
    });

    setImagePreview(result.assets[0].uri);
    handleImagePicked(result);
  };

  const userRef = doc(db, "users", userRefid);

  useEffect(() => {
    setName(currentUser?.displayName);
    setEmail(currentUser?.email);
  }, [currentUser]);

  //Changing in auth
  const onSave = async (image) => {
    //Update user email in Firebase Authentication.
    updateEmail(currentUser, email).catch((e) =>
      console.log("Update email failed.")
    );
    //Update user display name in Firebase Authentication.
    await updateProfile(currentUser, {
      displayName: name,
    }).catch((e) => console.log("Update profile failed"));

    //Update user document in Firestore.
    updateDoc(userRef, { name: name, userEmail: email }).catch((e) =>
      console.log("Update doc failed")
    );

    //Check if password needs to be edited in Firebase Authentication.
    if (password !== "") {
      updatePassword(currentUser, password).catch((e) =>
        console.log("Update password failed.")
      );
    }
  };

  handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.canceled) {
        const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="position"
      keyboardVerticalOffset="-50"
    >
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        onPress={goBack}
        disabled={isSaving || isUploading}
        style={styles.back}
      >
        <Back width="16" height="16" />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "FiraSans_300Light",
            color: "white",
            fontSize: 15,
          }}
        >
          Go Back
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "FiraSans_700Bold",
          fontSize: 30,
          marginTop: 30,
          letterSpacing: 0.5,
        }}
      >
        PROFILE
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.pictureContainer}>
          <View
            style={[
              styles.innerContainer,
              isUploading ? styles.uploading : null,
            ]}
          >
            {isUploading ? (
              <ActivityIndicator size="large" color="#212A3E" />
            ) : image && !imagePreview ? (
              <Image src={image} style={styles.picture} />
            ) : (
              <Image source={{ uri: imagePreview }} style={styles.picture} />
            )}
          </View>
        </View>
        <View style={styles.imageSelectionContainer}>
          <TouchableOpacity onPress={pickImage} style={{}}>
            <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 16 }}>
              Gallery |{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takeImage} style={{}}>
            <Text style={{ fontFamily: "FiraSans_300Light", fontSize: 16 }}>
              Camera
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>*Name:</Text>
        <TextInput
          style={[styles.input, isSaving ? styles.saving : null]}
          placeholder={"Enter name"}
          defaultValue={name}
          value={name}
          onChangeText={(text) => setName(text)}
          clearButtonMode="always"
          readOnly={isSaving}
        />
        {!!nameError && <Text style={{ color: "red" }}>{nameError}</Text>}

        <Text style={styles.label}>*Email:</Text>
        <TextInput
          style={[styles.input, isSaving ? styles.saving : null]}
          placeholder={"Enter email"}
          defaultValue={email}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          clearButtonMode="always"
          readOnly={isSaving}
        />
        {!!emailError && <Text style={{ color: "red" }}>{emailError}</Text>}

        <Text style={styles.label}>New Password (optional):</Text>
        <TextInput
          style={[styles.input, isSaving ? styles.saving : null]}
          value={password}
          onChangeText={(text) => setPassword(text)}
          clearButtonMode="always"
          secureTextEntry={true}
          readOnly={isSaving}
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={[styles.input, isSaving ? styles.saving : null]}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          clearButtonMode="always"
          secureTextEntry={true}
          readOnly={isSaving}
        />
        <Text style={{ color: "red" }}>{passwordError}</Text>
      </View>

      <TouchableOpacity
        style={styles.save}
        disabled={isSaving || isUploading}
        onPress={() => {
          if (name === "") {
            setnameError("*Required field");
          } else if (email === "") {
            setemailError("*Required field");
          } else if (confirmPassword !== password) {
            setPasswordError("*Password mismatch, please check.");
          } else {
            setIsSaving(true);
            setemailError();
            setnameError();
            setPasswordError();
            onSave().then(() => navigation.navigate("Welcome Home"));
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "FiraSans_300Light",
            color: "white",
            fontSize: 15,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginTop: "15%",
  },
  pictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    //marginLeft: -20,
  },
  innerContainer: {
    borderWidth: 6,
    borderRadius: "100%",
    borderColor: "#212A3E",
    height: 140,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  picture: {
    borderColor: "#212A3E",
    borderWidth: 2,
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  imageSelectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    //marginLeft: -20,
  },
  input: {
    width: "95%",
    padding: 15,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 5,
  },
  label: {
    fontSize: 15,
    marginLeft: 5,
    marginTop: 20,
    fontFamily: "FiraSans_300Light",
  },
  formContainer: {
    marginTop: 10,
  },
  back: {
    borderWidth: 1,
    borderRadius: 20,
    width: "30%",
    padding: 10,
    paddingLeft: 0,
    backgroundColor: "#212A3E",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: "grey",
    backgroundColor: "#212A3E",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  save: {
    marginTop: 60,
    borderWidth: 0.9,
    borderRadius: 20,
    marginLeft: "75%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "20%",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderColor: "grey",
    backgroundColor: "#212A3E",
  },
  saving: {
    borderColor: "#33cc33",
    borderWidth: 2,
  },
  uploading: {
    borderColor: "#33cc33",
  },
});

export default ProfileScreen;
