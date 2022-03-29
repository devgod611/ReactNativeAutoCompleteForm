import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen"

import Airport from './src/Airport';
import Location from './src/Location';

const App = () => {
  const isDarkMode = useColorScheme() === "dark"
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }
  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <ScrollView
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}
      >
        <View style={[styles.container]}>
          <View
              style={[styles.section, Platform.select({ ios: { zIndex: 99 } })]}
            >
            <Text style={styles.sectionTitle}>Airport List</Text>
            <Airport/>
          </View>
          <View
              style={[styles.section, Platform.select({ ios: { zIndex: 99 } })]}
            >
            <Text style={styles.sectionTitle}>Location List</Text>
            <Location/>
          </View>        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 50
  },
  section: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 3
  }
});

export default App;
