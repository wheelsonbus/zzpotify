/**
 * Albums screen
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {View, ScrollView, Text, Image} from "react-native";

import {theme, assets} from "../constants";
import {patch, wheels} from "../components";

const AlbumDetailsScreen = ({route, navigation}: any): Node => {
    const {album} = route.params;

    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.background,
            }}
        >
            {/*<ScrollView>
                <Image
                    source={{uri: album.cover}}
                    style={{
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1,
                        borderRadius: 16,
                    }}
                ></Image>
                <View
                    style={{
                        width: "100%",
                        height: 96,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{margin: 16}}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                color: "white",
                                opacity: 0.67,
                            }}
                        >
                            {album.title}
                        </Text>
                        {"\n"}
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 16,
                                color: "white",
                                opacity: 0.67,
                            }}
                        >
                            {album.artist.name + " (" + album.date + ")"}
                        </Text>
                    </Text>
                </View>
                {album.tracks.map((track, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                margin: 8,
                                marginTop: index > 0 ? 0 : 8,
                            }}
                        >
                            <TrackCard track={track} />
                        </View>
                    );
                })}
            </ScrollView>*/}

            <View style={{flex: 1}}>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        height: 80,
                        alignItems: "center",
                        position: "absolute",
                    }}
                >
                    <wheels.CircleButton
                        size={64}
                        icon={assets.icons.arrowLeft}
                        onPress={() => navigation.goBack()}
                        style={{
                            backgroundColor: theme.palette.secondary,
                            margin: 8,
                        }}
                    />
                </View>
            </View>
        </patch.SafeAreaView>
    );
};

export default AlbumDetailsScreen;
