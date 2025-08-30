import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // Clear previous errors
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://lms-g2f1.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        Alert.alert("Success", "Login successful!");
        // navigate to home
        router.push("/home");
      } else {
        setErrorMessage("Email or password is incorrect. Please try again.");
      }
    } catch (err: any) {
      // Handle errors without logging to console
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (errorData.message === "Password Incorrect") {
          setErrorMessage("Email or password is incorrect. Please try again.");
        } else if (errorData.message === "Server failed while logging in user") {
          setErrorMessage("Login service is temporarily unavailable. Please try again later.");
        } else {
          setErrorMessage("Email or password is incorrect. Please try again.");
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Navigate to signup page
  const goToSignup = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2232/2232688.png" }} 
            style={styles.logo}
          />
          <Text style={styles.title}>Library Management System</Text>
          <Text style={styles.subtitle}>Access your account</Text>
        </View>

        <View style={styles.formContainer}>
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage(""); // Clear error when user starts typing
              }}
              style={[styles.input, errorMessage ? styles.inputError : null]}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.passwordContainer, errorMessage ? styles.inputError : null]}>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage(""); // Clear error when user starts typing
                }}
                style={styles.passwordInput}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.visibilityToggle}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text style={styles.visibilityText}>
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={goToSignup}>
              <Text style={styles.signUpText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>© 2023 Library Management System v1.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    tintColor: "#2c3e50",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#f44336",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  visibilityToggle: {
    padding: 15,
  },
  visibilityText: {
    color: "#3498db",
    fontWeight: "600",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: "#3498db",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#3498db",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#7f8c8d",
  },
  signUpText: {
    color: "#3498db",
    fontWeight: "600",
  },
  copyright: {
    marginTop: 30,
    alignItems: "center",
  },
  copyrightText: {
    color: "#95a5a6",
    fontSize: 12,
  },
});