/**
 * Welcome screen
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {Image} from "react-native";

import {theme, assets} from "../constants";
import {patch, wheels} from "../components";

const WelcomeScreen = ({navigation}: any): Node => {
    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: theme.palette.background,
            }}
        >
            <Image
                style={{
                    flex: 1,
                    width: 160,
                    height: 160,
                    position: "absolute",
                    top: 80,
                    opacity: 0.5,
                }}
                source={require("../assets/icon.png")}
            />
            <wheels.SpanButton
                text="Artists"
                onPress={() => navigation.navigate("Artists")}
                style={{backgroundColor: theme.palette.secondary}}
            />
            <wheels.SpanButton
                text="Albums"
                onPress={() => navigation.navigate("Albums")}
                style={{backgroundColor: theme.palette.primary}}
            />
        </patch.SafeAreaView>
    );
};

export default WelcomeScreen;
