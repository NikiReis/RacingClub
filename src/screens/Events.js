import React from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventJson from "../db/events.json";

export default function Events() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("EventDetails", { event: item })}>
      <View style={styles.eventCard}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={EventJson.events}
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
  eventCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});
