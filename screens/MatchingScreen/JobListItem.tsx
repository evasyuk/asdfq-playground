import { TouchableOpacity } from 'react-native-gesture-handler'
import stc from 'string-to-color'
import { Dimensions, StyleSheet } from 'react-native'

import { Job } from '../../providers'
import { Text, View } from '../../components/Themed'
import { getFontColor } from '../../utils/getFontColor'
import LayoutConst from '../../constants/Layout'
import { useMemo } from 'react'

const width = Dimensions.get('window').width

export type JobListItemType = {
  item: Job
  separators: any
  onPress?: () => void
}

export const keyExtractor = (item) => `MatchingScreen.job.${item.jobId}`

export const JobListItem = ({ item, onPress }: JobListItemType) => {
  const companyName = useMemo(() => item?.companyName || '??', [item.companyName])
  const backgroundColor = useMemo(() => stc(companyName), [companyName])

  return (
    <TouchableOpacity key={keyExtractor(item)} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.viewWrapper}>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.textShortDescription}>
            {item.shortDescription}
          </Text>
          <View style={styles.fakeSeparator} />
          <Text numberOfLines={1} style={styles.textAddress}>
            {item.address.name}
          </Text>
        </View>
        <View
          style={[
            styles.avatarWrapper,
            {
              backgroundColor,
            },
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              {
                color: getFontColor(backgroundColor),
              },
            ]}
          >
            {companyName.substr(0, 2).toUpperCase()}
          </Text>
        </View>
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
