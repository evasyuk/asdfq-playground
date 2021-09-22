import { StyleSheet } from 'react-native'
// import Avatar from 'react-avatar'

import { Input, View } from '../components/Themed'
import { FontAwesome } from '@expo/vector-icons'
import { LineSeparator } from '../components/LineSeparator'

export default function Jobs() {
  return (
    <View style={styles.container}>
      {/*<Avatar name="User Profile" />*/}

      <FontAwesome name="user" size={100} style={{ marginRight: 15 }} />

      <Input placeholder="Name" />
      <Input placeholder="Surname" />

      <LineSeparator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
