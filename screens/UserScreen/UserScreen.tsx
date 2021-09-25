import { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Input, View } from 'components/Themed'
import { Avatar } from 'components/Avatar'
import { SkillOption, UserOptions, CarOptions, PropertyOptions } from 'providers'
import { useI18N } from 'hooks/useI18N'
import { useUserProvider } from 'providers/UserProvider'
import { SkillSection } from 'components/SkillSection'

import { LoadingIcon } from './LoadingIcon'

export default (): JSX.Element => {
  const { t } = useI18N()
  const { user, setUserSkills, setUserName, setUserSurname, loading } = useUserProvider()

  const { setOptions } = useNavigation()

  useEffect(() => {
    setOptions({
      headerRight: () => (loading ? <LoadingIcon /> : null),
    })
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
            <Input placeholder="Please, enter your name" value={user.name} onChangeText={(text) => setUserName(text)} />
            <Input
              placeholder="Please, enter your surname"
              value={user.surname}
              onChangeText={(text) => setUserSurname(text)}
            />
          </View>
        </View>

        <SkillSection
          t={t}
          title={'User'}
          options={UserOptions}
          enabledOptions={userSkillsObj}
          onPress={setUserSkills}
        />

        <SkillSection
          t={t}
          title={'Transport'}
          options={CarOptions}
          enabledOptions={userSkillsObj}
          onPress={setUserSkills}
        />

        <SkillSection
          t={t}
          title={'Property'}
          options={PropertyOptions}
          enabledOptions={userSkillsObj}
          onPress={setUserSkills}
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
