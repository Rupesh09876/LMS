import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert, ScrollView } from "react-native";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("User logged out") }
      ]
    );
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Navigate to Change Password screen");
  };

  const handleAppInfo = () => {
    Alert.alert("Library Management System", "Version 1.0.0\n© 2025 Library Inc.");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Enable Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>
        <TouchableOpacity style={styles.option} onPress={handleAppInfo}>
          <Text style={styles.optionText}>About & Version</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.option, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
