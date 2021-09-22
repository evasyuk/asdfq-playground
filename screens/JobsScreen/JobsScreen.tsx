import { FlatList, StyleSheet } from 'react-native'

import { View } from '../../components/Themed'
import { useCallback } from 'react'
import { NoDataToShow } from '../../providers/NoDataToShow'
import { JobListItem, JobListItemType, keyExtractor } from '../../components/JobListItem'
import { useJobProvider } from '../../providers/JobProvider'
import { FloatActionButton } from '../../components/FloatActionButton'

export default (): JSX.Element => {
  const { jobs: data } = useJobProvider()

  const renderItem = useCallback(
    (params: JobListItemType) => <JobListItem onPress={() => console.log('?')} {...params} />,
    [],
  )

  if (!data?.length) {
    return (
      <View style={styles.container}>
        <NoDataToShow />

        <FloatActionButton onPress={() => console.log('? ?')} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container]}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />

        <FloatActionButton onPress={() => console.log('? ?')} />
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
