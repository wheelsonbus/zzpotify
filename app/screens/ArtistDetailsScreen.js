/**
 * Album details screen
 *
 * @format
 * @flow
 */

import React from "react";
import type {Node} from "react";
import {View, SectionList, Text, Image, TouchableOpacity} from "react-native";

import {theme, assets} from "../constants";
import {patch, wheels} from "../components";

import RealmContext from "../data/realm";
const {useObject} = RealmContext;

const ArtistDetailsScreen = ({route, navigation}: any): Node => {
    const {_id} = route.params;
    const artist = useObject("Artist", _id);

    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.background,
            }}
        >
            <SectionList
                sections={[
                    {title: "Albums", schema: "Album", data: artist.albums},
                    {title: "EPs", schema: "EP", data: artist.eps},
                    {title: "Singles", schema: "Single", data: artist.singles},
                ]}
                keyExtractor={(item): string => item._id}
                ListHeaderComponent={() => {
                    let subtitle = [];
                    if (artist.albums.length) {
                        if (artist.albums.length == 1) {
                            subtitle.push("1 album");
                        } else {
                            subtitle.push(artist.albums.length + " albums");
                        }
                    }
                    if (artist.eps.length) {
                        if (artist.eps.length == 1) {
                            subtitle.push("1 EP");
                        } else {
                            subtitle.push(artist.eps.length + " EPs");
                        }
                    }
                    if (artist.singles.length) {
                        if (artist.singles.length == 1) {
                            subtitle.push("1 single");
                        } else {
                            subtitle.push(artist.singles.length + " singles");
                        }
                    }

                    if (!subtitle.length) {
                        subtitle = "No releases";
                    } else {
                        subtitle = subtitle.join("    ");
                    }

                    return (
                        <View>
                            <Image
                                source={
                                    {
                                        /* Mosaic of album covers? */
                                    }
                                }
                                style={{
                                    width: "100%",
                                    height: undefined,
                                    aspectRatio: 1 / 1,
                                }}
                            />
                            <View
                                style={{
                                    width: "100%",
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <View style={{flex: 1, margin: 16}}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 36,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        {artist.name}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 16,
                                            color: "white",
                                        }}
                                    >
                                        {subtitle}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
                renderSectionHeader={({section}) =>
                    !section.data.length ? null : (
                        <View style={{flex: 1, margin: 16}}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {section.title}
                            </Text>
                        </View>
                    )
                }
                renderItem={({item, index, section}) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ReleaseDetails", {
                                schema: section.schema,
                                _id: item._id,
                            });
                        }}
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
                            source={{
                                uri: item.cover,
                            }}
                            resizeMode="contain"
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
                    </TouchableOpacity>
                )}
            />

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
                    size={56}
                    icon={assets.icons.arrowLeft}
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: theme.palette.tertiary,
                        margin: 8,
                    }}
                />

                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        color: "white",
                        margin: 8,
                        opacity: 0,
                    }}
                >
                    Artist Details
                </Text>
            </View>
        </patch.SafeAreaView>
    );
};

export default ArtistDetailsScreen;
