import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Linking } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function EventDetails({ route }) {
  const { event } = route.params;

  const openMap = () => {
    const encodedLocation = encodeURIComponent(event.location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    Linking.openURL(url).catch((err) => console.error("Failed to open map:", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{event.date}</Text>

      <TouchableOpacity style={styles.locationContainer} onPress={openMap}>
        <Feather name="map-pin" size={20} color="#007BFF" />
        <Text style={styles.location}>{event.location}</Text>
      </TouchableOpacity>

      <Text style={styles.description}>{event.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: "#007BFF",
    marginLeft: 8,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
});
