import { View } from './Themed'
import { Dimensions, StyleSheet } from 'react-native'

export const LineSeparator = () => <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: Dimensions.get('window').width - 2 * 30,
  },
})
