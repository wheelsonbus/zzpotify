/**
 * SafeAreaView component
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {SafeAreaView as _SafeAreaView, Platform, StatusBar} from "react-native";

const SafeAreaView = (props: any): Node => {
    return (
        <_SafeAreaView
            style={{
                marginTop: 8,
            }}
            {...props}
        />
    );
};

export default SafeAreaView;
