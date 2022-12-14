/**
 * SpanButton component
 *
 * @format
 */

import React from "react";
import type {Node} from "react";
import {Text, TouchableOpacity} from "react-native";

const SpanButton = ({text, onPress, style}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: "100%",
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                ...style,
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default SpanButton;
