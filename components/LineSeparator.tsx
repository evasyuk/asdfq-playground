import { View } from './Themed'
import { Dimensions, StyleSheet } from 'react-native'

type LineSeparatorType = ({ height: number }) => JSX.Element

export const LineSeparator: LineSeparatorType = ({ height = 30 }) => (
  <View style={[styles.separator, { marginVertical: height }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
)

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: Dimensions.get('window').width - 2 * 30,
  },
})
