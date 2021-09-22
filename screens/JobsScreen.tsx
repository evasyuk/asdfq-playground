import { StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import { LineSeparator } from '../components/LineSeparator'

export default function JobsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <LineSeparator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
