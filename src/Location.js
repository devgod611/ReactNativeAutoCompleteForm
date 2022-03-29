import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();

import { StyleSheet,  View,  Button,  Dimensions, Text, } from 'react-native';

const Airport = () => {
  const [Location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState({});
  const dropdownController = useRef(null)
  const searchRef = useRef(null)

  const getLocation = async (query) => {
    const uri = 'http://autocomplete.travelpayouts.com/places2?term=' + query + '&locale=en&types[]=city';
    
    if(query == '') {
      setLocation([]);
      setSelectedValue();
    } else {
      try {
        setLoading(true);
        const response = await fetch(uri);
        const json = await response.json();
        let ports = [], id = 1;
        json.forEach(element => {
          ports.push({id: id, title: element.name});
          id++;
        });
        setLocation(ports);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
  };

  const onClearPress = useCallback(() => {
    setLocation(null)
  }, [])

  const onOpenSuggestionsList = useCallback((isOpened) => {}, [])


  useEffect(() => {
  }, []);

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: "row", alignItems: "center" },
          Platform.select({ ios: { zIndex: 1 } })
        ]}
      >
        <View style={{ width: 10 }}></View>
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller
          }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={true}
          initialValue={selectedValue}
          onChangeText={(text) => getLocation(text)}
          onSelectItem={setSelectedValue}
          loading={loading}
          dataSet={Location}
          debounce={600}
          onClear={onClearPress}
          direction={Platform.select({ android: "down" })}
          useFilter={false}
          textInputProps={{
            placeholder: "Type Location",
            autoCorrect: false,
            autoCapitalize: "none",
            style: {
              borderRadius: 25,
              backgroundColor: "#383b42",
              color: "#fff",
              paddingLeft: 18
            }
          }}
          rightButtonsContainerStyle={{
            borderRadius: 25,
            right: 8,
            height: 30,
            top: 10,
            alignSelfs: "center",
            backgroundColor: "#383b42"
          }}
          inputContainerStyle={{
            backgroundColor: "transparent"
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#383b42"
          }}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.8}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
          )}
          onOpenSuggestionsList={onOpenSuggestionsList}
          ChevronIconComponent={
            <Feather name="x-circle" size={18} color="#fff" />
          }
          ClearIconComponent={
            <Feather name="chevron-down" size={20} color="#fff" />
          }
          inputHeight={50}
          showChevron={false}
        />
        <View style={{ width: 10 }}></View>
        <Button
          style={{ flexGrow: 0 }}
          title="Toggle"
          onPress={() => dropdownController.current.toggle()}
        ></Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
});
export default Airport;