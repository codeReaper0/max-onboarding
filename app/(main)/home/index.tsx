import {View, Text, StyleSheet} from "react-native";
import React from "react";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>We're working on something amazing!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Black background
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F5C200", // Yellow color for the title
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff", // White color for the subtitle
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
