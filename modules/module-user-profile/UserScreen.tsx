import { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Input, View } from 'packages/components/Themed'
import { Avatar } from 'packages/components/Avatar'
import { SkillOption, UserOptions, CarOptions, PropertyOptions } from '@asdfq/providers'
import { useI18N } from '@asdfq/hooks/useI18N'
import { SkillSection } from 'packages/components/SkillSection'

import { LoadingIcon } from './components/LoadingIcon'
import { useUser } from '@asdfq/state/slices/hooks/useUser'

export default (): JSX.Element => {
  const { t } = useI18N()
  const { setOptions } = useNavigation()
  const { user, loading, onChangeUserName, onChangeUserSurname, onChangeUserSkills } = useUser()

  useEffect(() => {
    setOptions({
      headerRight: () => (loading ? <LoadingIcon /> : null),
    })

    // setTimeout(temp, 4000)
  }, [loading])

  const userSkillsObj = useMemo(
    () =>
      user.skills.reduce((acc, curr) => {
        acc[curr] = curr
        return acc
      }, {} as { any: SkillOption }),
    [user.skills],
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.headerContainer}>
          <Avatar title={`${user.name} ${user.surname}`} size={100} />

          <View style={styles.inputWrapper}>
            <Input placeholder="Please, enter your name" value={user.name} onChangeText={onChangeUserName} />
            <Input placeholder="Please, enter your surname" value={user.surname} onChangeText={onChangeUserSurname} />
          </View>
        </View>

        <SkillSection
          t={t}
          title={'User'}
          options={UserOptions}
          enabledOptions={userSkillsObj}
          onPress={onChangeUserSkills}
        />

        <SkillSection
          t={t}
          title={'Transport'}
          options={CarOptions}
          enabledOptions={userSkillsObj}
          onPress={onChangeUserSkills}
        />

        <SkillSection
          t={t}
          title={'Property'}
          options={PropertyOptions}
          enabledOptions={userSkillsObj}
          onPress={onChangeUserSkills}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: { width: '100%', marginVertical: 20 },
  scrollViewContainer: { width: '100%', paddingHorizontal: 30 },
  headerContainer: { alignItems: 'center', paddingTop: 30 },
})
