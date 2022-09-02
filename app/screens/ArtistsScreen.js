/**
 * Artists screen
 *
 * @format
 */

import React, {useState, useMemo} from "react";
import type {Node} from "react";
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";
import {Discogs} from "@wheelsonbus/abstract-music";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext, {Artist, Release, Track} from "../data/realm";
const {useRealm, useQuery} = RealmContext;

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

            <wheels.CircleButton
                icon={assets.icons.plus}
                onPress={async () => {
                    const discogs = new Discogs(
                        "WwcXlaiWIiJJDUpoVHXL",
                        "tDkXKPEgaoCSdTPHSxSCdYKUhgdEmZiN",
                    );

                    console.log("Fetching artists");
                    const artists = [
                        await discogs.getArtist("557974"),
                        await discogs.getArtist("29735"),
                        await discogs.getArtist("262643"),
                        await discogs.getArtist("562858"),
                        await discogs.getArtist("5762374"),
                        await discogs.getArtist("254479"),
                        await discogs.getArtist("175395"),
                        await discogs.getArtist("1871196"),
                    ];

                    artists.forEach((_artist) => {
                        realm.write(() => {
                            const artist = realm.create(
                                "Artist",
                                Artist.generate(_artist),
                            );

                            _artist.releases.forEach((_release) => {
                                Image.prefetch(_release.cover).catch(
                                    (error) => {
                                        console.error(error);
                                    },
                                );

                                const release = realm.create(
                                    "Release",
                                    Release.generate(_release),
                                );
                                _release.tracks.forEach((_track) => {
                                    const track = realm.create(
                                        "Track",
                                        Track.generate(_track),
                                    );
                                    release.tracks.push(track);
                                });

                                artist.releases.push(release);
                            });
                            console.log(artist);
                        });
                    });
                }}
                style={{
                    backgroundColor: theme.palette.primary,
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            />
        </patch.SafeAreaView>
    );
};

export default ArtistsScreen;
