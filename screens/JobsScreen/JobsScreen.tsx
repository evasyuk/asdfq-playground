import { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { View } from 'components/Themed'
import { NoDataToShow } from 'providers/NoDataToShow'
import { JobListItem, JobListItemType, keyExtractor } from 'components/JobListItem'
import { useJobProvider } from 'providers/JobProvider'
import { FloatActionButton } from 'components/FloatActionButton'

export default (): JSX.Element => {
  const { jobs: data, removeJob } = useJobProvider()
  const navigation = useNavigation()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onAddItem = useCallback(() => navigation.navigate('AddEdit', { isEdit: false }), [])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onEditItem = useCallback((item) => navigation.navigate('AddEdit', { isEdit: true, job: item }), [])
  const onDeleteItem = useCallback((item) => removeJob(item), [])

  const renderItem = useCallback(
    (params: JobListItemType) => (
      <JobListItem onPress={() => onEditItem(params.item)} onLongPress={() => onDeleteItem(params.item)} {...params} />
    ),
    [],
  )

  if (!data?.length) {
    return (
      <View style={styles.container}>
        <NoDataToShow />

        <FloatActionButton onPress={onAddItem} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />

        <FloatActionButton onPress={onAddItem} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '100%',
    height: 20,
  },
})
