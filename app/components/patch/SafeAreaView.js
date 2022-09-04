/**
 * SafeAreaView component
 *
 * @format
 */

import React from "react";
import type {Node} from "react";
import {SafeAreaView as _SafeAreaView, Platform, StatusBar} from "react-native";

const SafeAreaView = (props) => {
    return (
        <_SafeAreaView
            style={{
                marginTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
            {...props}
        />
    );
};

export default SafeAreaView;
