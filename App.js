/**
 * zzpotify: abstract your music
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {assets} from "./app/constants";
import {patch, wheels} from "./app/components";
import {
    WelcomeScreen,
    ArtistsScreen,
    AlbumsScreen,
    AlbumDetailsScreen,
} from "./app/screens";

const stack = createNativeStackNavigator();

const App = (): Node => {
    return (
        <NavigationContainer>
            <stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName="Welcome"
            >
                <stack.Screen name="Welcome" component={WelcomeScreen} />
                <stack.Screen name="Artists" component={ArtistsScreen} />
                <stack.Screen name="Albums" component={AlbumsScreen} />
                <stack.Screen
                    name="AlbumDetails"
                    component={AlbumDetailsScreen}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
