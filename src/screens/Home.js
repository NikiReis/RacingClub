import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import eventsData from "../db/events.json";
import featuringEventsData from "../db/next_events.json";
import nearbyTracksData from "../db/kartodromos.json";

export default function Feed() {
  const [events, setEvents] = useState([]);
  const [featuringEvents, setFeaturingEvents] = useState([]);
  const [nearbyTracks, setNearbyTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setEvents(eventsData.events);
    setFeaturingEvents(featuringEventsData.events);
    setNearbyTracks(nearbyTracksData.tracks);
  }, []);

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("EventDetails", { event: item })}
    >
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <Text style={styles.eventTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TrackDetails", { track: item })}
    >
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Text style={styles.trackLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {events.length > 0 && featuringEvents.length > 0 && nearbyTracks.length > 0 ? (
        <>
          <View style={styles.section}>
            <Text style={styles.title}>Eventos em Destaque</Text>
            <FlatList
              data={featuringEvents.slice(0, 3)} // Limita a 3 itens
              renderItem={renderEventItem}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Outros Eventos</Text>
            <FlatList
              data={events.slice(0, 3)} // Limita a 3 itens
              renderItem={renderEventItem}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Kartódromos Próximos</Text>
            <FlatList
              data={nearbyTracks.slice(0, 3)} // Limita a 3 itens
              renderItem={renderTrackItem}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            />
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando dados...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 50,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  carouselItem: {
    borderRadius: 10,
    alignItems: "center",
    marginRight: 15,
  },
  eventImage: {
    width: 280,
    height: 140,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  trackLocation: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
