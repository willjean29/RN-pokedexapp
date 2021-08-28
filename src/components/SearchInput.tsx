import useDebouncedValue from 'hooks/useDebouncedValue';
import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
export interface SearchInputProps {
  onDebounce: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({onDebounce}) => {
  const [itemPokemon, setItemPokemon] = useState('');
  const {top} = useSafeAreaInsets();
  const debouncedValue = useDebouncedValue(itemPokemon);
  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);
  return (
    <View style={{...styles.viewContainer, top: top + 20}}>
      <View style={styles.viewContainerInput}>
        <TextInput
          placeholder="Buscar pokemon"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setItemPokemon(text)}
          value={itemPokemon}
          style={{flex: 1, fontSize: 18, padding: 0}}
        />
        <Icon name="search-outline" color="gray" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 999,
  },
  viewContainerInput: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 7,

    marginVertical: 10,
  },
});

export default SearchInput;
