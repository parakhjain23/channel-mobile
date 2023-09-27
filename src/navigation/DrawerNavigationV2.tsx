import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ChannelsScreen from '../screens/channelsScreen/ChannelsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import IpadScreen from '../screens/ipadScreen/IpadScreen';
import { DEVICE_TYPES } from '../constants/Constants';
import { useCustomSelector } from '../utils/deepCheckSelector';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { InsideDrawerScreenV2 } from '../screens/drawer/InsideDrawerScreenV2';

const Drawer = createDrawerNavigator();
export const DrawerNavigationV2 = () => {
    const { colors } = useTheme();
    // var count = orgsState?.unreadCountForDrawerIcon; // todo handle this
    var count = 0
    let ScreenName, ScreenComponent;
    const { deviceType, orgIdAndDataMapping, currentOrgId } = useCustomSelector((state: $ReduxCoreType) => ({
        deviceType: state?.appInfo?.deviceType,
        orgIdAndDataMapping: state?.orgs?.orgIdAndDataMapping,
        currentOrgId: state?.orgs?.currentOrgId,
    }))
    if (deviceType === DEVICE_TYPES[0]) {
        [ScreenName, ScreenComponent] = ['Channel', ChannelsScreen];
    } else {
        [ScreenName, ScreenComponent] = ['Ipad', IpadScreen];
    }

    return (
        <Drawer.Navigator
            drawerContent={props => (
                <InsideDrawerScreenV2 />
            )}>
            <Drawer.Screen
                name={ScreenName}
                component={ScreenComponent}
                options={({ route, navigation }) => ({
                    headerTitle:
                        orgIdAndDataMapping != null
                            ? orgIdAndDataMapping[currentOrgId].name
                            : 'Channel',
                    headerStyle: { backgroundColor: colors.headerColor },
                    headerTitleStyle: { color: colors.textColor },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                marginRight: 0,
                                justifyContent: 'center',
                                paddingRight: Platform?.OS == 'ios' ? 45 : 20,
                            }}
                            onPressIn={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={styles.container}>
                                <Icon name="bars" size={24} color={colors.secondaryColor} />
                                {count > 0 && (
                                    <View style={styles.counter}>
                                        <Text style={styles.counterText}>{count}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ),
                })}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginLeft: 15,
    },
    counter: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
