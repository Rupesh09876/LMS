import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("Success", "Your message has been sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-center mb-4">Contact Us</Text>

      {/* Company Info */}
      <View className="mb-6">
        <Text className="text-lg font-semibold">Our Office</Text>
        <Text className="text-base text-gray-600">123 Main Street, Kathmandu, Nepal</Text>

        <Text className="text-lg font-semibold mt-4">Phone</Text>
        <Text className="text-base text-gray-600">+977-9812345678</Text>

        <Text className="text-lg font-semibold mt-4">Email</Text>
        <Text className="text-base text-gray-600">support@libraryapp.com</Text>

        <Text className="text-lg font-semibold mt-4">Working Hours</Text>
        <Text className="text-base text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</Text>
        <Text className="text-base text-gray-600">Sat: 10:00 AM - 4:00 PM</Text>
        <Text className="text-base text-gray-600">Sun: Closed</Text>
      </View>

      {/* Contact Form */}
      <Text className="text-lg font-semibold mb-2">Send us a Message</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4 h-28"
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
