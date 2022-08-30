/**
 * Patch components object
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {SafeAreaView, Platform, StatusBar} from "react-native";

const Patch = {
    SafeAreaView: (props: any): Node => {
        return (
            <SafeAreaView
                style={{
                    marginTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
                {...props}
            />
        );
    },
};
export default Patch;
