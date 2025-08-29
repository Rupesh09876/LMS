import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function Help() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-center mb-5">
        Help & Support
      </Text>

      {/* Intro Section */}
      <Text className="text-base text-gray-600 mb-5 text-center">
        Need assistance? Find answers to common questions below or reach out to our support team.
      </Text>

      {/* FAQ Section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-3">Frequently Asked Questions</Text>

        <View className="mb-4">
          <Text className="font-medium">📌 How do I add a book?</Text>
          <Text className="text-gray-600">
            Go to the "Add Book" section, fill in details like title, author, ISBN, and description, then save.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="font-medium">📌 How do I edit or delete a book?</Text>
          <Text className="text-gray-600">
            Navigate to "My Books", select the book, and choose edit or delete options.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="font-medium">📌 What should I do if I forget my password?</Text>
          <Text className="text-gray-600">
            On the login page, click "Forgot Password" and follow the instructions to reset it.
          </Text>
        </View>
      </View>

      {/* Contact Support Section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-3">Still Need Help?</Text>
        <Text className="text-gray-600 mb-2">
          If your issue isn’t listed above, feel free to contact our support team:
        </Text>
        <Text className="text-gray-700">📧 Email: rupeshkatuwal53@gmail.com</Text>
        <Text className="text-gray-700">📞 Phone: +977-9804077492</Text>
      </View>

      {/* Support Button */}
      <TouchableOpacity className="bg-blue-600 rounded-xl p-4 items-center mt-3">
        <Text className="text-white font-semibold">Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
