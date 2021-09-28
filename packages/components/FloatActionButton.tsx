import { Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { View } from '@asdfq/components/Themed'
import LayoutConst from '@asdfq/constants/Layout'

type FloatActionButtonProps = {
  onPress: () => void
}

export const FloatActionButton = ({ onPress }: FloatActionButtonProps): JSX.Element => (
  <View style={styles.floatActionButtonWrapper}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={styles.inner}>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  floatActionButtonWrapper: {
    ...LayoutConst.shadow,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 50,
    right: 50,
    borderRadius: 25,
    backgroundColor: '#FFF2CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    backgroundColor: '#FFF2CC',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 30, fontWeight: 'bold' },
})
