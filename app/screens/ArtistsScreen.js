/**
 * Artists screen
 *
 * @format
 * @flow
 */

import React, {useCallback, useMemo} from "react";
import type {Node} from "react";
import {View, FlatList, Text, Image} from "react-native";
import {Spotify} from "@wheelsonbus/abstract-music";

import {assets, theme} from "../constants";
import {patch, wheels} from "../components";

import RealmContext, {Artist, Album, Track} from "../data/realm";
const {useRealm, useQuery} = RealmContext;

const ArtistsScreen = ({navigation}: any): Node => {
    const realm = useRealm();
    const artistsQuery = useQuery("Artist");
    const artists = useMemo(() => artistsQuery.sorted("name"), [artistsQuery]);

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
                    Artists
                </Text>
            </View>
            <FlatList
                data={artists}
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
                            source={{uri: item.image}}
                            resizeMode="cover"
                            style={{
                                width: undefined,
                                height: "100%",
                                aspectRatio: 1 / 1,
                            }}
                        />
                        <Text style={{marginLeft: 16, color: "white"}}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                }}
                            >
                                {item.name}
                            </Text>
                            {"\n"}
                            <Text
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                {item.albums.length + " album(s)"}
                            </Text>
                        </Text>
                    </View>
                )}
            ></FlatList>

            <wheels.CircleButton
                icon={assets.icons.plus}
                onPress={async () => {
                    const spotify = await new Spotify(
                        "9a5263c92d434136be3bd8fc840ae09f",
                        "36dd19d4082c405d8f84b5b0a4994f98",
                    );
                    const artists = [
                        await spotify.getArtist("4EhvF0sd1sdEJ49h6AuWvB"),
                        await spotify.getArtist("0YMeriqrS3zgsX24nfY0F0"),
                        await spotify.getArtist("0vEsuISMWAKNctLlUAhSZC"),
                        await spotify.getArtist("0WwSkZ7LtFUFjGjMZBMt6T"),
                        await spotify.getArtist("0k17h0D3J5VfsdmQ1iZtE9"),
                        await spotify.getArtist("3JsMj0DEzyWc0VDlHuy9Bx"),
                        await spotify.getArtist("0L8ExT028jH3ddEcZwqJJ5"),
                        await spotify.getArtist("1w5Kfo2jwwIPruYS2UWh56"),
                    ];

                    realm.write(() => {
                        artists.forEach((artist) => {
                            const artistData = realm.create(
                                "Artist",
                                Artist.generate(artist),
                            );

                            artist.albums.forEach((album) => {
                                const albumData = realm.create(
                                    "Album",
                                    Album.generate(album),
                                );

                                album.tracks.forEach((track) => {
                                    const trackData = realm.create(
                                        "Track",
                                        Track.generate(track),
                                    );
                                    albumData.tracks.push(trackData);
                                });
                                artistData.albums.push(albumData);
                            });
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
