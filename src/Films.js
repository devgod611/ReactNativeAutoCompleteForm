import Autocomplete from 'react-native-autocomplete-input'; // 3.3.1
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const API = 'http://api.travelpayouts.com/data/en/airports.json';

class AutocompleteExample extends Component {
  static renderFilm(film) {
    const { name } = film;

    return (
      <View>
        <Text style={styles.titleText}>{name}</Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: ''
    };
  }

  componentDidMount() {
    fetch(`${API}`).then(res => res.json()).then((json) => {
      const films = json;
      let arr = [];
      json.forEach(element => {
        arr.push({name: element.name});
      });
      this.setState({ arr });
    });
  }

  componentWillUnmount() {

  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const films  = this.state.arr;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.name.search(regex) >= 0);
  }

  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].name) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Star Wars film title"
          renderItem={({ name, release_date }) => (
            <TouchableOpacity onPress={() => this.setState({ query: name })}>
              <Text style={styles.itemText}>
                {name} ({release_date.split('-')[0]})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            AutocompleteExample.renderFilm(films[0])
          ) : (
            <Text style={styles.infoText}>
              Enter Title of a Star Wars movie
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default AutocompleteExample;