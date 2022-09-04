/**
 * Album details screen
 *
 * @format
 */

import React, {useMemo} from "react";
import type {Node} from "react";
import {View, SectionList, Text, Image, TouchableOpacity} from "react-native";

import {theme, assets} from "../constants";
import {patch, wheels} from "../components";

import RealmContext from "../data/realm";
const {useObject} = RealmContext;

const ArtistDetailsScreen = ({route, navigation}) => {
    const {_id} = route.params;
    const artist = useObject("Artist", _id);
    const albums = useMemo(
        () => artist.releases.filtered("type == 'album'"),
        [artist],
    );
    const eps = useMemo(
        () => artist.releases.filtered("type == 'ep'"),
        [artist],
    );
    const singles = useMemo(
        () => artist.releases.filtered("type == 'single'"),
        [artist],
    );
    const covers = useMemo(() => {
        let c = [];
        for (const release of artist.releases) {
            if (release.cover) {
                c.push(release.cover);
            }
        }
        c = c.sort(() => 0.5 - Math.random()).splice(0, 4);
        switch (c.length) {
            case 0:
                c = ["", "", "", ""];
                break;
            case 1:
                c = [c[0], c[0], c[0], c[0]];
                break;
            case 2:
            case 3:
                c = [c[0], c[1], c[0], c[1]];
                break;
        }

        return c;
    }, [artist]);

    const subtitle = useMemo(() => {
        let s = [];
        if (albums.length) {
            if (albums.length == 1) {
                s.push("1 album");
            } else {
                s.push(albums.length + " albums");
            }
        }
        if (eps.length) {
            if (eps.length == 1) {
                s.push("1 EP");
            } else {
                s.push(eps.length + " EPs");
            }
        }
        if (singles.length) {
            if (singles.length == 1) {
                s.push("1 single");
            } else {
                s.push(singles.length + " singles");
            }
        }

        if (!s.length) {
            s = "No releases";
        } else {
            s = s.join("    ");
        }
        return s;
    }, [albums, eps, singles]);

    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.background,
            }}
        >
            <SectionList
                sections={[
                    {title: "Albums", data: albums},
                    {title: "EPs", data: eps},
                    {title: "Singles", data: singles},
                ]}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={() => (
                    <View>
                        <View
                            style={{
                                flex: 1,
                                width: "100%",
                                height: undefined,
                                aspectRatio: 1 / 1,
                            }}
                        >
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        source={{uri: covers[0]}}
                                        style={{
                                            width: "200%",
                                            height: "200%",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        source={{uri: covers[1]}}
                                        style={{
                                            width: "200%",
                                            height: "200%",
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <View
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        source={{uri: covers[2]}}
                                        style={{
                                            width: "200%",
                                            height: "200%",
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        source={{uri: covers[3]}}
                                        style={{
                                            width: "200%",
                                            height: "200%",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
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
                )}
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
