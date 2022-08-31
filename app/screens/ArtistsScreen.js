/**
 * Artists screen
 *
 * @format
 * @flow
 */

import React, {useCallback} from "react";
import type {Node} from "react";
import {View, FlatList, Text} from "react-native";
import {Spotify} from "@wheelsonbus/abstract-music";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext, {Artist, Album, Track} from "../data/realm";
const {useRealm, useQuery} = RealmContext;

const ArtistsScreen = ({navigation}: any): Node => {
    const realm = useRealm();
    const artists = useQuery("Artist");
    console.log(artists);

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
                        opacity: 0.67,
                        margin: 8,
                    }}
                >
                    Artists
                </Text>
            </View>
            <FlatList
                data={artists}
                keyExtractor={(item): string => item._id}
                renderItem={({item}) => <Text>{item.name}</Text>}
            ></FlatList>

            <wheels.CircleButton
                icon={assets.icons.plus}
                onPress={async () => {
                    const spotify = await new Spotify(
                        "9a5263c92d434136be3bd8fc840ae09f",
                        "36dd19d4082c405d8f84b5b0a4994f98",
                    );
                    const artist = await spotify.getArtist(
                        "5ZT08jsdXoPKMU5nt0DIkI",
                    );

                    realm.write(() => {
                        const artistData = realm.create(
                            "Artist",
                            Artist.generate(artist),
                        );
                        console.log(artistData);

                        artist.albums.forEach((album) => {
                            const albumData = realm.create(
                                "Album",
                                Album.generate(album),
                            );
                            console.log(albumData);

                            album.tracks.forEach((track) => {
                                const trackData = realm.create(
                                    "Track",
                                    Track.generate(track),
                                );
                                console.log(trackData);

                                albumData.tracks.push(trackData);
                            });

                            artistData.albums.push(albumData);
                        });

                        console.log(artistData);
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
