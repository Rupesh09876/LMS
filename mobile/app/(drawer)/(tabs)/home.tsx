import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define types for our book data
interface Book {
  id: number;
  title: string;
  author: string;
  status: "Available" | "Borrowed";
  rating: number;
  image: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "Available",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "Borrowed",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/id/8227306-L.jpg",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    status: "Available",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "Available",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "Borrowed",
    rating: 4.2,
    image: "https://covers.openlibrary.org/b/id/8232244-L.jpg",
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    status: "Available",
    rating: 4.9,
    image: "https://covers.openlibrary.org/b/id/8259424-L.jpg",
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: "Borrowed",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/id/8232226-L.jpg",
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    status: "Available",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/id/8232227-L.jpg",
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "Available",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/id/8232230-L.jpg",
  },
  {
    id: 10,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    status: "Borrowed",
    rating: 4.2,
    image: "https://covers.openlibrary.org/b/id/8232231-L.jpg",
  },
  {
    id: 11,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    status: "Available",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/id/8232232-L.jpg",
  },
  {
    id: 12,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    status: "Available",
    rating: 4.4,
    image: "https://covers.openlibrary.org/b/id/8232233-L.jpg",
  },
  {
    id: 13,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    status: "Borrowed",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/id/8232234-L.jpg",
  },
  {
    id: 14,
    title: "The Shining",
    author: "Stephen King",
    status: "Available",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/id/8232235-L.jpg",
  },
  {
    id: 15,
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    status: "Available",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/id/8232236-L.jpg",
  },
  {
    id: 16,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    status: "Borrowed",
    rating: 4.7,
    image: "https://covers.openlibrary.org/b/id/8232237-L.jpg",
  },
  {
    id: 17,
    title: "Brave New World",
    author: "Aldous Huxley",
    status: "Available",
    rating: 4.4,
    image: "https://covers.openlibrary.org/b/id/8232238-L.jpg",
  },
  {
    id: 18,
    title: "The Book Thief",
    author: "Markus Zusak",
    status: "Available",
    rating: 4.8,
    image: "https://covers.openlibrary.org/b/id/8232239-L.jpg",
  },
  {
    id: 19,
    title: "The Fault in Our Stars",
    author: "John Green",
    status: "Borrowed",
    rating: 4.5,
    image: "https://covers.openlibrary.org/b/id/8232240-L.jpg",
  },
  {
    id: 20,
    title: "Dune",
    author: "Frank Herbert",
    status: "Available",
    rating: 4.6,
    image: "https://covers.openlibrary.org/b/id/8232241-L.jpg",
  }
];

  const filteredBooks = books.filter((book) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "available") return book.status === "Available";
    if (selectedFilter === "borrowed") return book.status === "Borrowed";
    return true;
  });

  const getBookImage = (book: Book) => {
    if (book.image) {
      return <Image source={{ uri: book.image }} style={styles.bookImage} />;
    }
    return (
      <View style={styles.bookImagePlaceholder}>
        <Text style={styles.bookImageText}>
          {book.title
            .split(" ")
            .map((word: string) => word[0]) // Added type annotation here
            .join("")
            .toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderBookItem = ({ item }: { item: Book }) => ( // Added type annotation here
    <View style={styles.bookCard}>
      {getBookImage(item)}
      <Text style={styles.bookTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>
        by {item.author}
      </Text>

      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#F59E0B" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <Text
        style={[
          styles.statusText,
          item.status === "Available" ? styles.available : styles.borrowed,
        ]}
      >
        {item.status}
      </Text>

      {item.status === "Available" ? (
        <TouchableOpacity style={styles.borrowButton}>
          <Text style={styles.borrowButtonText}>Borrow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.unavailableButton} disabled>
          <Text style={styles.unavailableButtonText}>Unavailable</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#6B7280"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>{filteredBooks.length} books found</Text>
          <Text style={styles.lastUpdated}>Last updated: 17:02</Text>
        </View>
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item: Book) => item.id.toString()} // Added type annotation here
        numColumns={2}
        contentContainerStyle={styles.booksGrid}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal
        animationType="fade"
        transparent
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <Text style={styles.filterTitle}>Filter by</Text>
              {["all", "available", "borrowed"].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter && styles.filterOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedFilter(filter);
                    setFilterModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilter === filter && styles.filterOptionTextSelected,
                    ]}
                  >
                    {filter === "all" ? "All Books" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40, fontSize: 16 },
  filterButton: { padding: 4 },
  resultsInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resultsText: { fontSize: 14, color: "#6B7280" },
  lastUpdated: { fontSize: 12, color: "#9CA3AF" },
  booksGrid: { padding: 16 },
  columnWrapper: { justifyContent: "space-between", marginBottom: 16 },
  bookCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bookImage: { width: 100, height: 150, borderRadius: 8, marginBottom: 8 },
  bookImagePlaceholder: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  bookImageText: { fontSize: 20, fontWeight: "bold", color: "#9CA3AF" },
  bookTitle: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 4, textAlign: "center" },
  bookAuthor: { fontSize: 12, color: "#6B7280", marginBottom: 8, textAlign: "center" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  ratingText: { fontSize: 12, color: "#6B7280", marginLeft: 4 },
  statusText: { fontSize: 12, fontWeight: "500", marginBottom: 8 },
  available: { color: "#059669" },
  borrowed: { color: "#DC2626" },
  borrowButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  borrowButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "500" },
  unavailableButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
    opacity: 0.7,
  },
  unavailableButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "500" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  filterModal: { backgroundColor: "white", borderRadius: 12, padding: 20, width: "80%" },
  filterTitle: { fontSize: 18, fontWeight: "600", marginBottom: 16, color: "#111827" },
  filterOption: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 8 },
  filterOptionSelected: { backgroundColor: "#3B82F6" },
  filterOptionText: { fontSize: 16, color: "#374151" },
  filterOptionTextSelected: { color: "white", fontWeight: "500" },
});