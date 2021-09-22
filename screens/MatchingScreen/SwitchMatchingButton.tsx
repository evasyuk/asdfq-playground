import { View } from '../../components/Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'

type SwitchMatchingButtonProps = {
  onPress: () => void
  isTrue: boolean
}

export const SwitchMatchingButton = ({ onPress, isTrue }: SwitchMatchingButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.iconWrapper}>
      <FontAwesome name={isTrue ? 'toggle-on' : 'toggle-off'} size={30} />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  iconWrapper: { width: 40, height: 40, marginRight: 16, justifyContent: 'center' },
})
