/**
 * Artists screen
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {View, ScrollView, Text} from "react-native";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

const ArtistsScreen = ({navigation}: any): Node => {
    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.background,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 80,
                    alignItems: "center",
                }}
            >
                <wheels.CircleButton
                    size={64}
                    icon={assets.icons.arrowLeft}
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: theme.palette.tertiary,
                        margin: 8,
                    }}
                />
                <Text
                    style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        color: "white",
                        opacity: 0.67,
                        margin: 8,
                    }}
                >
                    Artists
                </Text>
            </View>
            {/*<ScrollView>
                {data.artists.map((artist, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                margin: 8,
                                marginTop: index > 0 ? 0 : 8,
                            }}
                        >
                            <ArtistCard artist={artist} />
                        </View>
                    );
                })}
            </ScrollView>*/}

            <wheels.CircleButton
                icon={assets.icons.plus}
                style={{
                    backgroundColor: theme.palette.tertiary,
                    position: "absolute",
                    bottom: 32,
                    right: 32,
                }}
            />
        </patch.SafeAreaView>
    );
};

export default ArtistsScreen;
