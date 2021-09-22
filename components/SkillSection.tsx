import { View } from './Themed'
import { Text } from 'react-native'
import { LineSeparator } from './LineSeparator'
import { CarOptions, PropertyOptions, SkillOption, UserOptions } from '../providers'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

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
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
    </View>

    <LineSeparator height={10} />

    <View>
      {Object.keys(options).map((option: SkillOption) => (
        <View style={{ width: '100%', paddingHorizontal: 0, marginVertical: 5 }} key={`${option}`}>
          <BouncyCheckbox
            size={22}
            fillColor="green"
            text={t(option)}
            iconStyle={{ borderColor: 'black' }}
            textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
            onPress={() => onPress(!enabledOptions[option], option)}
            isChecked={!!enabledOptions[option]}
            disableBuiltInState
          />
        </View>
      ))}
    </View>

    <View style={{ height: 20 }} />
  </>
)
