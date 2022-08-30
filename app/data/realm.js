import {createRealmContext} from "@realm/react";

const Artist = {
    name: "Artist",
    primaryKey: "_id",
    properties: {
        _id: "int",
        name: "string",
        albums: "Album[]",
    },
};

const Album = {
    name: "Album",
    primaryKey: "_id",
    properties: {
        _id: "int",
        title: "string",
        date: "string",
        cover: "string",
        tracks: "Track[]",
        artist: {
            type: "linkingObjects",
            objectType: "Artist",
            property: "albums",
        },
    },
};

const Track = {
    name: "Track",
    primaryKey: "_id",
    properties: {
        _id: "int",
        title: "string",
        album: {
            type: "linkingObjects",
            objectType: "Album",
            property: "tracks",
        },
    },
};

const config = {
    schema: [Artist, Album, Track],
};
export default createRealmContext(config);
