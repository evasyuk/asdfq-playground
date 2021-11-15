import { StyleSheet, Text } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import { View } from '@asdfq/components/Themed'
import { LineSeparator } from '@asdfq/components/LineSeparator'
import { CarOptions, PropertyOptions, SkillOption, UserOptions } from '@asdfq/providers'

type SkillSectionTypeProps = {
  title: string
  options: typeof UserOptions | typeof CarOptions | typeof PropertyOptions
  enabledOptions: {
    any: SkillOption
  }
  t: (string) => string
  onPress: (boolean, SkillOption) => void
}

export const SkillSection = ({ title, options, enabledOptions, t, onPress }: SkillSectionTypeProps): JSX.Element => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>

    <LineSeparator height={10} />

    <View>
      {Object.keys(options).map((option: SkillOption) => (
        <View style={styles.itemWrapper} key={`${option}`}>
          <BouncyCheckbox
            size={22}
            fillColor="green"
            text={t(option)}
            iconStyle={styles.itemIconStyle}
            textStyle={styles.itemTextStyle}
            onPress={() => onPress(!enabledOptions[option], option)}
            isChecked={!!enabledOptions[option]}
            disableBuiltInState
          />
        </View>
      ))}
    </View>

    <View style={styles.spacer} />
  </>
)

const styles = StyleSheet.create({
  titleWrapper: { marginTop: 10 },
  title: { fontSize: 25, fontWeight: 'bold' },
  itemWrapper: { width: '100%', paddingHorizontal: 0, marginVertical: 5 },
  itemIconStyle: { borderColor: 'black' },
  itemTextStyle: { textDecorationLine: 'none' },
  spacer: { height: 20 },
})
