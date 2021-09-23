import { View } from '../../components/Themed'
import { StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const SaveIcon = ({ enabled, onPress }: { enabled: boolean; onPress: () => void }): JSX.Element => (
  <View style={[styles.iconWrapper, enabled ? {} : { opacity: 0.5 }]}>
    <TouchableOpacity onPress={onPress} disabled={!enabled}>
      <FontAwesome name={'save'} size={30} />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  iconWrapper: { width: 40, height: 40, marginRight: 0, justifyContent: 'center' },
})
