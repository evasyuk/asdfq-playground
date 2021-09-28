import { TouchableOpacity } from 'react-native-gesture-handler'
import { Dimensions, StyleSheet } from 'react-native'
import { useMemo } from 'react'

import { Job } from '@asdfq/providers'
import { Text, View } from '@asdfq/components/Themed'
import { Avatar } from '@asdfq/components/Avatar'
import LayoutConst from '@asdfq/constants/Layout'

const width = Dimensions.get('window').width

export type JobListItemType = {
  item: Job
  index: number
  onPress?: () => void
  onLongPress?: () => void
}

export const keyExtractor = (item: Job): string => `MatchingScreen.job.${item.jobId}`

export const JobListItem = ({ item, onPress, onLongPress, index }: JobListItemType): JSX.Element => {
  const companyName = useMemo(() => item?.companyName || '??', [item.companyName])
  const viewWrapperStyle = useMemo(() => (index === 0 ? styles.firstViewWrapper : styles.viewWrapper), [index])

  return (
    <TouchableOpacity key={keyExtractor(item)} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.5}>
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
