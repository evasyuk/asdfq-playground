import { Dimensions, StyleSheet } from 'react-native'
// import Avatar from 'react-avatar'

import { Input, View } from '../components/Themed'
import { FontAwesome } from '@expo/vector-icons'

export default function Jobs() {
  return (
    <View style={styles.container}>
      {/*<Avatar name="User Profile" />*/}

      <FontAwesome name="user" size={100} style={{ marginRight: 15 }} />

      <Input placeholder="Name" />
      <Input placeholder="Surname" />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: Dimensions.get('window').width - 2 * 30,
  },
})
