/**
 * Artists screen
 *
 * @format
 * @flow
 */

import React, {useState, useMemo} from "react";
import type {Node} from "react";
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";
import {Discogs} from "@wheelsonbus/abstract-music";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext, {Artist, Album, EP, Single, Track} from "../data/realm";
const {useRealm, useQuery} = RealmContext;

const ArtistsScreen = ({navigation}: any): Node => {
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
                keyExtractor={(item): string => item._id}
                renderItem={({item, index}) => (
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
                                {item.albums.length + " album(s)"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <wheels.CircleButton
                icon={assets.icons.plus}
                onPress={async () => {
                    const discogs = new Discogs(
                        "WwcXlaiWIiJJDUpoVHXL",
                        "tDkXKPEgaoCSdTPHSxSCdYKUhgdEmZiN",
                    );

                    console.log("Getting Artist");
                    const artists = [await discogs.getArtist("557974")];

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

                                let tracks = [];
                                let duration = 0;
                                let maxDuration = 0;
                                _release.tracks.forEach((_track) => {
                                    tracks.push(
                                        realm.create(
                                            "Track",
                                            Track.generate(_track),
                                        ),
                                    );
                                    duration += _track.duration;
                                    maxDuration = Math.max(
                                        _track.duration,
                                        maxDuration,
                                    );
                                });

                                if (
                                    duration < 30 * 60 &&
                                    ((tracks.length < 3 &&
                                        maxDuration >= 10 * 60) ||
                                        (tracks.length > 3 &&
                                            tracks.length < 7))
                                ) {
                                    const release = realm.create(
                                        "EP",
                                        Album.generate(_release),
                                    );
                                    tracks.forEach((track) => {
                                        release.tracks.push(track);
                                    });
                                    artist.eps.push(release);
                                } else if (
                                    duration < 30 * 60 &&
                                    tracks.length < 3
                                ) {
                                    const release = realm.create(
                                        "Single",
                                        Album.generate(_release),
                                    );
                                    tracks.forEach((track) => {
                                        release.tracks.push(track);
                                    });
                                    artist.singles.push(release);
                                } else {
                                    const release = realm.create(
                                        "Album",
                                        Album.generate(_release),
                                    );
                                    tracks.forEach((track) => {
                                        release.tracks.push(track);
                                    });
                                    artist.albums.push(release);
                                }
                            });
                            console.log(artist);
                        });
                    });
                }}
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
