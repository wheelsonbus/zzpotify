/**
 * CircleButton component
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {Image, TouchableOpacity} from "react-native";

const CircleButton = ({size = 80, icon, onPress, style}: any): Node => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                overflow: "hidden",
                ...style,
                width: size,
                height: size,
                borderRadius: size / 2,
            }}
        >
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: size / 2,
                    height: size / 2,
                }}
            />
        </TouchableOpacity>
    );
};

export default CircleButton;
