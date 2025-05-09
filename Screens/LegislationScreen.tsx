import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  LEGISLATION_AIRCRAFT_REGISTRATION,
  LEGISLATION_DESTRUCTION_OF_AIRCRAFT,
  LEGISLATION_REMOTE_IDENTIFICATION_OF_AIRCRAFT,
  LEGISLATION_SMALL_UNMANNED_AIRCRAFT_SYSTEMS,
  LEGISLATION_USC_44809_EXEMPTION,
} from "../Constants/URIS";

const LegistlationScreen = () => {
  const open = async (uri: string) => {
    await WebBrowser.openBrowserAsync(uri);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>
        From the Code of Federal Regulations
      </Text>
      <Text style={styles.sectionSubtitle}>
        Title 14 - Aeronautics and Space
      </Text>
      <Text style={styles.sectionSubtitle}>
        Chapter I - Federal Aviation Administration, Department of Transportation
      </Text>
      <Text style={styles.sectionSubtitle}>Subchapter C - Aircraft</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => open(LEGISLATION_AIRCRAFT_REGISTRATION)}
      >
        <Text style={styles.buttonText}>
          14 CFR § 48 - Registration and Marking Requirements for Small
          Unmanned Aircraft
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        From the Code of Federal Regulations
      </Text>
      <Text style={styles.sectionSubtitle}>
        Title 14 - Aeronautics and Space
      </Text>
      <Text style={styles.sectionSubtitle}>
        Chapter I - Federal Aviation Administration, Department of Transportation
      </Text>
      <Text style={styles.sectionSubtitle}>
        Subchapter F - Air Traffic and General Operating Rules
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => open(LEGISLATION_REMOTE_IDENTIFICATION_OF_AIRCRAFT)}
      >
        <Text style={styles.buttonText}>
          14 CFR § 89 - Remote Identification of Unmanned Aircraft
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => open(LEGISLATION_SMALL_UNMANNED_AIRCRAFT_SYSTEMS)}
      >
        <Text style={styles.buttonText}>
          14 CFR § 107 - Small Unmanned Aircraft Systems
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>From the United States Code</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => open(LEGISLATION_DESTRUCTION_OF_AIRCRAFT)}
      >
        <Text style={styles.buttonText}>
          §32. Destruction of aircraft or aircraft facilities
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => open(LEGISLATION_USC_44809_EXEMPTION)}
      >
        <Text style={styles.buttonText}>
          §44809. Exemption for limited recreational operations of unmanned
          aircraft
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LegistlationScreen;