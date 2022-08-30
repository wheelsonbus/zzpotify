/**
 * zzpotify
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {Text} from "react-native";

import {assets} from "./app/constants";
import {patch, wheels} from "./app/components";

const App = (): Node => {
    return (
        <patch.SafeAreaView style={{flex: 1, backgroundColor: "lavender"}}>
            <Text>Hello, World!</Text>
            <wheels.CircleButton
                icon={assets.icons.plus}
                style={{position: "absolute", bottom: 8, right: 8}}
            />
        </patch.SafeAreaView>
    );
};

export default App;
