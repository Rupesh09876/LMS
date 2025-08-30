import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
  Image, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
  });
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Camera roll permissions are required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !profileImage) {
      setErrorMessage("Please fill all fields and select a profile image.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      data.append("profileImage", {
        uri: profileImage.uri,
        name: `profile.${profileImage.uri.split(".").pop()}`,
        type: "image/jpeg",
      } as any);

      const res = await axios.post(
        "https://lms-g2f1.onrender.com/api/user/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        Alert.alert("Success", "Registration successful! Please login.");
        router.push("/login");
      } else {
        setErrorMessage(res.data.message || "Registration failed. Try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our library community today</Text>
        </View>

        <View style={styles.formContainer}>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => handleChange("email", text)}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showHide}>{showPassword ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { backgroundColor: "#f1f3f6" }]}
            value={formData.role}
            editable={false}
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage.uri }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imageText}>Select Profile Image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.signUpText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2c3e50" },
  subtitle: { fontSize: 16, color: "#7f8c8d" },
  formContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, elevation: 5 },
  input: { width: "100%", padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, marginBottom: 15, backgroundColor: "#f9f9f9" },
  passwordContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, backgroundColor: "#f9f9f9", marginBottom: 15 },
  passwordInput: { flex: 1, padding: 15 },
  showHide: { color: "#3498db", paddingHorizontal: 15, fontWeight: "600" },
  imagePicker: { width: "100%", height: 120, backgroundColor: "#e1e5ea", borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 20 },
  imageText: { color: "#555" },
  imagePreview: { width: "100%", height: "100%", resizeMode: "cover" },
  button: { width: "100%", padding: 16, backgroundColor: "#3498db", borderRadius: 8, alignItems: "center", marginBottom: 20 },
  buttonDisabled: { backgroundColor: "#bdc3c7" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: "#7f8c8d" },
  signUpText: { color: "#3498db", fontWeight: "600" },
  errorText: { color: "#d32f2f", marginBottom: 15, textAlign: "center" },
});
