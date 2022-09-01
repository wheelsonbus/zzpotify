/**
 * zzpotify: abstract your music
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Realm, createRealmContext} from "@realm/react";

import {patch} from "./app/components";
import {
    WelcomeScreen,
    ArtistsScreen,
    ArtistDetailsScreen,
    AlbumsScreen,
    ReleaseDetailsScreen,
} from "./app/screens";

import RealmContext from "./app/data/realm";
const {RealmProvider} = RealmContext;

const stack = createNativeStackNavigator();

const App = (): Node => {
    return (
        <RealmProvider>
            <NavigationContainer>
                <stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName="Welcome"
                >
                    <stack.Screen name="Welcome" component={WelcomeScreen} />
                    <stack.Screen name="Artists" component={ArtistsScreen} />
                    <stack.Screen
                        name="ArtistDetails"
                        component={ArtistDetailsScreen}
                    />
                    <stack.Screen name="Albums" component={AlbumsScreen} />
                    <stack.Screen
                        name="ReleaseDetails"
                        component={ReleaseDetailsScreen}
                    />
                </stack.Navigator>
            </NavigationContainer>
        </RealmProvider>
    );
};

export default App;
