import React, { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home'
import Detail from '../screens/Detail'

const Stack = createStackNavigator()

const Routes = (): ReactElement => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Routes;


