import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { View } from 'components/Themed'
import { useMatchProvider } from 'providers/MatchProvider'
import { NoDataToShow } from 'providers/NoDataToShow'
import { JobListItem, JobListItemType, keyExtractor } from 'components/JobListItem'
import { useJobProvider } from 'providers/JobProvider'

import { SwitchMatchingButton } from './SwitchMatchingButton'

export default function MatchingScreen() {
  const [isMatchMode, setMatchMode] = useState(true)
  const { matched, unmatched } = useMatchProvider()
  const { removeJob } = useJobProvider()
  const { setOptions } = useNavigation()
  const navigation = useNavigation()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onEditItem = useCallback((item) => navigation.navigate('AddEdit', { isEdit: true, job: item }), [])
  const onDeleteItem = useCallback((item) => removeJob(item), [])

  useEffect(() => {
    setOptions({
      headerRight: () => <SwitchMatchingButton isTrue={isMatchMode} onPress={() => setMatchMode((old) => !old)} />,
    })
  }, [isMatchMode])

  const data = isMatchMode ? matched : unmatched

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
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />
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
