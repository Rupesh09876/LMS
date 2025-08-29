import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

interface CapturedItem {
  uri: string;
  location: { latitude: number; longitude: number } | null;
}

export default function Profile() {
  const [items, setItems] = useState<CapturedItem[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
  const [description, setDescription] = useState("");

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission is required to pick a profile image!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      alert("Camera permission is required!");
      return;
    }

    const locationPermission = await Location.requestForegroundPermissionsAsync();
    if (!locationPermission.granted) {
      alert("Location permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const loc = await Location.getCurrentPositionAsync({});
      const newItem: CapturedItem = {
        uri: result.assets[0].uri,
        location: loc
          ? { latitude: loc.coords.latitude, longitude: loc.coords.longitude }
          : null,
      };
      setItems((prev) => [...prev, newItem]);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      {/* Profile Info */}
      <View className="items-center mb-6">
        <TouchableOpacity onPress={pickProfileImage}>
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              className="w-24 h-24 rounded-full mb-3"
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-200 justify-center items-center mb-3">
              <Text className="text-2xl">👤</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          className="border border-gray-300 rounded-md w-full p-2 mb-2"
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          className="border border-gray-300 rounded-md w-full p-2 mb-2"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-gray-300 rounded-md w-full p-2 mb-2"
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="Birth Date (YYYY-MM-DD)"
        />

        {/* Gender Selection */}
        <View className="flex-row justify-between w-full mb-2">
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              onPress={() => setGender(g as "Male" | "Female" | "Other")}
              className={`flex-1 py-2 mx-1 rounded-md border ${
                gender === g ? "border-blue-600 bg-blue-100" : "border-gray-300"
              }`}
            >
              <Text className="text-center">{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          className="border border-gray-300 rounded-md w-full p-2 mb-2 h-20 text-gray-700"
          value={description}
          onChangeText={setDescription}
          placeholder="Write a little description about yourself..."
          multiline
        />
      </View>

      {/* Camera & Location */}
      <TouchableOpacity
        onPress={openCamera}
        className="bg-blue-600 py-3 rounded-2xl mb-6"
      >
        <Text className="text-white text-center text-lg font-semibold">
          📸 Open Camera & Get Location
        </Text>
      </TouchableOpacity>

      {/* Captured Items */}
      <Text className="text-lg font-semibold mb-3">Recent Captures</Text>
      {items.map((item, index) => (
        <View
          key={index}
          className="flex-row items-center border-b border-gray-200 py-3"
        >
          <Text className="w-8 text-center text-gray-700">{index + 1}</Text>
          <Image
            source={{ uri: item.uri }}
            className="w-16 h-16 rounded-lg mx-3"
          />
          <View className="flex-1">
            <Text className="text-gray-600">Captured</Text>
            {item.location && (
              <Text className="text-xs text-gray-500">
                📍 {item.location.latitude.toFixed(4)},{" "}
                {item.location.longitude.toFixed(4)}
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
