import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { CarOptions, Job, PropertyOptions, SkillOption, UserOptions } from '@asdfq/providers'
import { useJobProvider } from '@asdfq/providers/JobProvider'
import { View, Input } from 'packages/components/Themed'
import { Avatar } from 'packages/components/Avatar'
import { SkillSection } from 'packages/components/SkillSection'
import { useI18N } from '@asdfq/hooks/useI18N'
import { addSkill, removeSkill } from '@asdfq/utils/skills'
import { SaveIcon } from '@asdfq/module-add-edit-screen/components/SaveIcon'

export type AddEditProps = {
  isEdit: boolean
  job: Job | undefined
}

const getEmptyJob = (): Job => ({
  jobId: 'random' + Math.ceil(Math.random() * 10000000),

  companyName: '',
  companyLogo: '',

  address: {
    name: '',
  },

  shortDescription: '',
  longDescription: '',

  mandatorySkills: [],
})

export default (): JSX.Element | null => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { params } = useRoute<'AddEdit'>()
  const { t } = useI18N()
  const { setOptions, goBack } = useNavigation()
  const { addNewJob, editJob } = useJobProvider()
  const [localJob, setLocalJob] = useState<Job>(params.isEdit ? (params.job as Job) : (getEmptyJob() as Job))

  const [isValid, setValid] = useState(false)

  const setJobSkills = (isAdded: boolean, skill: SkillOption) =>
    setLocalJob((old) => ({
      ...old,
      mandatorySkills: isAdded ? addSkill(old.mandatorySkills, skill) : removeSkill(old.mandatorySkills, skill),
    }))

  const onSave = useCallback(() => {
    if (params?.isEdit) {
      editJob(localJob)
    } else {
      addNewJob(localJob)
    }
    goBack()
  }, [localJob])

  useEffect(() => {
    setOptions({
      headerRight: () => <SaveIcon enabled={isValid} onPress={onSave} />,
    })
  }, [isValid])

  useEffect(() => {
    const valid =
      !!localJob.companyName.length &&
      !!localJob.shortDescription &&
      !!localJob.address.name &&
      !!localJob.mandatorySkills.length

    setValid(valid)
  }, [localJob])

  const mandatorySkillsObj = useMemo(
    () =>
      localJob.mandatorySkills.reduce((acc, curr) => {
        acc[curr] = curr
        return acc
      }, {} as { any: SkillOption }),
    [localJob.mandatorySkills],
  )

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
        <Input
          placeholder="Please, enter company name"
          value={localJob.companyName}
          onChangeText={(text) => setLocalJob((old) => ({ ...old, companyName: text }))}
          style={styles.companyInput}
        />
        <Avatar title={localJob.companyName} />
      </View>
      <Input
        placeholder="Please, enter short description"
        value={localJob.shortDescription}
        onChangeText={(text) => setLocalJob((old) => ({ ...old, shortDescription: text }))}
      />
      <Input
        placeholder="Please, enter address"
        value={localJob.address.name}
        onChangeText={(text) => setLocalJob((old) => ({ ...old, address: { name: text } }))}
        multiline
      />

      <View style={styles.spacer} />

      <SkillSection
        t={t}
        title={'User'}
        options={UserOptions}
        enabledOptions={mandatorySkillsObj}
        onPress={setJobSkills}
      />

      <SkillSection
        t={t}
        title={'Transport'}
        options={CarOptions}
        enabledOptions={mandatorySkillsObj}
        onPress={setJobSkills}
      />

      <SkillSection
        t={t}
        title={'Property'}
        options={PropertyOptions}
        enabledOptions={mandatorySkillsObj}
        onPress={setJobSkills}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: { width: '100%', paddingHorizontal: 30, backgroundColor: 'white' },
  headerContainer: { alignItems: 'center', paddingVertical: 20, flexDirection: 'row' },
  spacer: { height: 20, width: 1 },
  companyInput: { width: undefined, flex: 1, marginRight: 20 },
})
