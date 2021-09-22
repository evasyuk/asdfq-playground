import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, StyleSheet } from 'react-native'

import { Job } from '../providers'
import { Text, View } from './Themed'
import LayoutConst from '../constants/Layout'
import { useMemo } from 'react'
import { Avatar } from './Avatar'

const width = Dimensions.get('window').width

export type JobListItemType = {
  item: Job
  index: number
  onPress?: () => void
}

export const keyExtractor = (item) => `MatchingScreen.job.${item.jobId}`

export const JobListItem = ({ item, onPress, index }: JobListItemType) => {
  const companyName = useMemo(() => item?.companyName || '??', [item.companyName])
  const viewWrapperStyle = useMemo(() => (index === 0 ? styles.firstViewWrapper : styles.viewWrapper), [index])

  return (
    <TouchableOpacity key={keyExtractor(item)} onPress={onPress} activeOpacity={0.5}>
      <View style={viewWrapperStyle}>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.textShortDescription}>
            {item.shortDescription}
          </Text>
          <View style={styles.fakeSeparator} />
          <Text numberOfLines={1} style={styles.textAddress}>
            {item.address.name}
          </Text>
        </View>
        <Avatar title={companyName} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  viewWrapper: {
    ...LayoutConst.shadow,

    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    width: width - 2 * 10,
    height: 90,
    padding: 20,
    margin: 10,
  },
  firstViewWrapper: {
    ...LayoutConst.shadow,

    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    width: width - 2 * 10,
    height: 90,
    padding: 20,
    margin: 10,
    marginTop: 20,
  },
  textWrapper: { flex: 1, backgroundColor: '#f9f9f9' },
  textShortDescription: { fontWeight: 'bold' },
  textAddress: { fontSize: 12 },
  fakeSeparator: { width: 1, height: 10, opacity: 0 },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
