import { Text, View, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function About() {
  const teamMembers = [
    { name: "Alice Johnson", role: "Project Manager", image: "https://i.pravatar.cc/150?img=1" },
    { name: "Robert Smith", role: "Lead Developer", image: "https://i.pravatar.cc/150?img=2" },
    { name: "Emma Brown", role: "UI/UX Designer", image: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      {/* Header */}
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold text-gray-900">About Us</Text>
        <Text className="text-base text-gray-600 mt-2 text-center">
          Our Library Management System helps users organize, access, and manage books efficiently.
        </Text>
      </View>

      {/* Who We Are */}
      <View className="mb-6 p-5 bg-gray-50 rounded-xl shadow flex-row">
        <Ionicons name="people-outline" size={28} color="#1D4ED8" className="mr-4" />
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-2">Who We Are</Text>
          <Text className="text-gray-700 leading-7">
            We are a dedicated team committed to simplifying library operations and enhancing the reading experience. Our platform enables seamless management and access to books for students, educators, and enthusiasts.
          </Text>
        </View>
      </View>

      {/* What We Do */}
      <View className="mb-6 p-5 bg-gray-50 rounded-xl shadow flex-row">
        <MaterialIcons name="menu-book" size={28} color="#10B981" className="mr-4" />
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-2">What We Do</Text>
          <Text className="text-gray-700 leading-7 mb-2">
            Our system provides:
          </Text>
          <View className="ml-4 space-y-1">
            <Text className="text-gray-700">• Browse and search available books efficiently.</Text>
            <Text className="text-gray-700">• Add books with full details including title, author, ISBN, and description.</Text>
            <Text className="text-gray-700">• Manage borrowers, track issued books, and handle returns.</Text>
            <Text className="text-gray-700">• Maintain complete library records seamlessly.</Text>
          </View>
        </View>
      </View>

      {/* Our Mission */}
      <View className="mb-6 p-5 bg-gray-50 rounded-xl shadow flex-row">
        <Ionicons name="flag-outline" size={28} color="#F59E0B" className="mr-4" />
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-2">Our Mission</Text>
          <Text className="text-gray-700 leading-7">
            To provide a robust, easy-to-use digital library system that makes knowledge accessible, organized, and enjoyable for all users.
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View className="mb-6 p-5 bg-gray-50 rounded-xl shadow flex-row">
        <Ionicons name="call-outline" size={28} color="#EF4444" className="mr-4" />
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-900 mb-2">Contact Us</Text>
          <Text className="text-gray-700 leading-7">
            Email: support@librarysystem.com{"\n"}
            Phone: +977-9800000000{"\n"}
            Website: www.librarysystem.com
          </Text>
        </View>
      </View>

      {/* Meet the Team */}
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Meet the Team</Text>
        {teamMembers.map((member, index) => (
          <View
            key={index}
            className="flex-row items-center mb-4 bg-gray-50 p-4 rounded-xl shadow"
          >
            <Image
              source={{ uri: member.image }}
              className="w-16 h-16 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">{member.name}</Text>
              <Text className="text-gray-700">{member.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
