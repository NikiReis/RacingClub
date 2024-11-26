import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TracksJson from "../db/kartodromos.json";

export default function Tracks() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("TrackDetails", { track: item })}>
      <View style={styles.trackCard}>
        <Image source={{ uri: item.image }} style={styles.trackImage} />
        <Text style={styles.trackTitle}>{item.name}</Text>
        <Text style={styles.trackLocation}>{item.location}</Text>
        <Text style={styles.trackDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={TracksJson.tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  trackCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  trackImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  trackLocation: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
    marginBottom: 5,
  },
  trackDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});
