import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { View } from 'components/Themed'

export const LoadingIcon = (): JSX.Element => (
  <View style={styles.iconWrapper}>
    <FontAwesome name={'spinner'} size={30} />
  </View>
)

const styles = StyleSheet.create({
  iconWrapper: { width: 40, height: 40, marginRight: 16, justifyContent: 'center' },
})
