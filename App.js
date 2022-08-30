/**
 * zzpotify
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type {Node} from "react";
import {Text} from "react-native";

import {Patch} from "./app/components";

const App: () => Node = () => {
    return (
        <Patch.SafeAreaView style={{backgroundColor: "lavender"}}>
            <Text>Hello, World!</Text>
        </Patch.SafeAreaView>
    );
};

export default App;
