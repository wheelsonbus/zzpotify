/**
 * Albums screen
 *
 * @format
 * @flow
 */

import React, {useMemo} from "react";
import type {Node} from "react";
import {View, FlatList, Image, Text} from "react-native";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext from "../data/realm";
const {useQuery} = RealmContext;

const AlbumsScreen = ({navigation}: any): Node => {
    const albumQuery = useQuery("Album");
    const albums = useMemo(() => albumQuery.sorted("title"), [albumQuery]);

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

            <FlatList
                data={albums}
                keyExtractor={(item): string => item._id}
                renderItem={({item, index}) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            padding: 16,
                            backgroundColor:
                                index % 2
                                    ? theme.palette.background
                                    : theme.palette.background2,
                        }}
                    >
                        <Image
                            source={{uri: item.cover}}
                            resizeMode="cover"
                            style={{
                                width: undefined,
                                height: "100%",
                                aspectRatio: 1 / 1,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginLeft: 16,
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                {item.date}
                            </Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                {item.tracks.length + " track(s)"}
                            </Text>
                        </View>
                    </View>
                )}
            ></FlatList>
        </patch.SafeAreaView>
    );
};

export default AlbumsScreen;
