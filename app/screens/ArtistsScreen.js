/**
 * Artists screen
 *
 * @format
 */

import React, {useState, useEffect, useMemo, useCallback} from "react";
import type {Node} from "react";
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext, {Artist, Release, Track} from "../data/realm";
const {useRealm, useQuery} = RealmContext;

import {useFetchArtist} from "../api/Discogs";

const ArtistsScreen = ({navigation}) => {
    const realm = useRealm();
    const artistQuery = useQuery("Artist");
    const artists = useMemo(() => artistQuery.sorted("name"), [artistQuery]);

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
                    numberOfLines={1}
                    style={{
                        fontSize: 48,
                        fontWeight: "bold",
                        color: "white",
                        margin: 8,
                    }}
                >
                    Artists
                </Text>
            </View>
            <FlatList
                data={artists}
                keyExtractor={(item) => item._id}
                renderItem={({item, index}) => {
                    let subtitle = [];
                    if (item.releases.length) {
                        if (item.releases.length == 1) {
                            subtitle = "1 release";
                        } else {
                            subtitle = item.releases.length + " releases";
                        }
                    } else {
                        subtitle = "No releases";
                    }

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ArtistDetails", {
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
                            <View style={{flex: 1}}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: "white",
                                    }}
                                >
                                    {item.name}
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
                        </TouchableOpacity>
                    );
                }}
            />

            <FetchArtistButton />
        </patch.SafeAreaView>
    );
};

const FetchArtistButton = () => {
    const realm = useRealm();
    const {fetchArtist, data, error, loading} = useFetchArtist(
        useCallback(async (data) => {
            if (data != null) {
                realm.write(() => {
                    const artist = realm.create(
                        "Artist",
                        Artist.generate(data),
                    );
                    for (const _release of data.releases) {
                        const release = realm.create(
                            "Release",
                            Release.generate(_release),
                        );
                        for (const _track of _release.tracks) {
                            const track = realm.create(
                                "Track",
                                Track.generate(_track),
                            );
                            release.tracks.push(track);
                        }
                        artist.releases.push(release);
                    }
                    console.log("Created Artist:");
                    console.log(artist);
                });
            }
        }, []),
    );

    useEffect(() => {
        console.log("Updated data:");
        console.log(data);
    }, [data]);

    return (
        <wheels.CircleButton
            icon={assets.icons.plus}
            onPress={() => {
                fetchArtist("272467");
            }}
            style={{
                backgroundColor: theme.palette.primary,
                position: "absolute",
                bottom: 16,
                right: 16,
            }}
        />
    );
};

export default ArtistsScreen;
