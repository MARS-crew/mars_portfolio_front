import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './Main';
import Main2 from './Main2';
import Main3 from './Main3';

const Stack = createStackNavigator();

const Group = () => {
    return (
    <View style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator: ({ current, layouts }) => {
                return {
                cardStyle: {
                    transform: [
                    {
                        translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                        }),
                    },
                    ],
                },
                };
            },
            }}
        >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Main2" component={Main2} />
            <Stack.Screen name="Main3" component={Main3} />
        </Stack.Navigator>
        </NavigationContainer>
    </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
});

export default Group;
