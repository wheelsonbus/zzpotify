/**
 * Albums screen
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {View, ScrollView, Text} from "react-native";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

const AlbumsScreen = ({navigation}: any): Node => {
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
                    size={56}
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
                        margin: 8,
                    }}
                >
                    Albums
                </Text>
            </View>
            {/*<ScrollView>
                {data.artists.map((artist, i) => {
                    return (
                        <View key={i}>
                            {artist.albums.map((album, j) => {
                                return (
                                    <View
                                        key={j}
                                        style={{
                                            margin: 8,
                                            marginTop: i > 0 ? 0 : 8,
                                        }}
                                    >
                                        <AlbumCard album={album} />
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </ScrollView>*/}
        </patch.SafeAreaView>
    );
};

export default AlbumsScreen;
