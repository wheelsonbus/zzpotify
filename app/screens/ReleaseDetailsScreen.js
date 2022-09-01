/**
 * Release details screen
 *
 * @format
 * @flow
 */

import React, {useState} from "react";
import type {Node} from "react";
import {View, FlatList, Text, Image} from "react-native";

import {theme, assets} from "../constants";
import {patch, wheels} from "../components";

import RealmContext from "../data/realm";
const {useObject} = RealmContext;

const ReleaseDetailsScreen = ({route, navigation}: any): Node => {
    const {_id} = route.params;
    const release = useObject("Release", _id);

    const [coverAspectRatio, setCoverAspectRatio] = useState(1);
    Image.getSize(release.cover, (width, height) => {
        setCoverAspectRatio(width / height);
    });

    return (
        <patch.SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.palette.background,
            }}
        >
            <FlatList
                ListHeaderComponent={() => (
                    <View>
                        <Image
                            source={{uri: release.cover}}
                            style={{
                                width: "100%",
                                height: undefined,
                                aspectRatio: coverAspectRatio,
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
                                        fontSize: 32,
                                        fontWeight: "bold",
                                        color: "white",
                                    }}
                                >
                                    {release.title}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 16,
                                        color: "white",
                                    }}
                                >
                                    {release.artist[0].name +
                                        " (" +
                                        release.date +
                                        ")"}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                data={release.tracks}
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
                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {(index + 1).toString().padStart(2, "0")}
                            </Text>
                        </View>

                        <View style={{flex: 1, marginLeft: 16}}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                {item.title}
                            </Text>
                        </View>
                    </View>
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
                    Release Details
                </Text>
            </View>
        </patch.SafeAreaView>
    );
};

export default ReleaseDetailsScreen;
