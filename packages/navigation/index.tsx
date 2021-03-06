/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '@asdfq/constants/Colors'
import useColorScheme from '@asdfq/hooks/useColorScheme'
import ModalScreen from '@asdfq/modals/ModalScreen'
import MatchingScreen from 'modules/module-matching-screen/MatchingScreen'
import Jobs from 'modules/module-jobs-screen/JobsScreen'
import UserProfileScreen from 'modules/module-user-profile/UserScreen'
import AddEditScreen from 'modules/module-add-edit-screen/AddEditScreen'

import { RootStackParamList, RootStackScreenProps, RootTabParamList, RootTabScreenProps } from '../../types'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }): JSX.Element {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="AddEdit"
        component={AddEditScreen}
        options={({ route: { params } }: RootStackScreenProps<'AddEdit'>) => ({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          title: params?.isEdit ? 'Edit job' : 'Add job',
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="JobsTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="MatchingTab"
        component={MatchingScreen}
        options={({ navigation }: RootTabScreenProps<'MatchingTab'>) => ({
          title: 'Matching',
          tabBarIcon: ({ color }) => <TabBarIcon name="angle-up" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="info-circle" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="JobsTab"
        component={Jobs}
        options={{
          title: 'Jobs tab',
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="UserProfileTab"
        component={UserProfileScreen}
        options={{
          title: 'User Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-md" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  // eslint-disable-next-line prettier/prettier
  name: React.ComponentProps<typeof FontAwesome>['name'],
  color: string
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />
}
