/**
 * Realm source
 *
 * @format
 */

import Realm, {createRealmContext} from "@realm/react";
import "react-native-get-random-values";
import {v4 as uuid} from "uuid";

export class Artist {
    static generate(artist) {
        return {
            _id: uuid(),
            name: artist.name,
            image: artist.image,
            albums: [],
        };
    }

    static schema = {
        name: "Artist",
        primaryKey: "_id",
        properties: {
            _id: "string",
            name: "string",
            image: "string",
            albums: "Album[]",
        },
    };
}

export class Album {
    static generate(album) {
        return {
            _id: uuid(),
            title: album.title,
            date: album.date,
            cover: album.cover,
            tracks: [],
        };
    }

    static schema = {
        name: "Album",
        primaryKey: "_id",
        properties: {
            _id: "string",
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
}

export class Track {
    static generate(track) {
        return {
            _id: uuid(),
            title: track.title,
        };
    }

    static schema = {
        name: "Track",
        primaryKey: "_id",
        properties: {
            _id: "string",
            title: "string",
            album: {
                type: "linkingObjects",
                objectType: "Album",
                property: "tracks",
            },
        },
    };
}

export default createRealmContext({
    schema: [Artist.schema, Album.schema, Track.schema],
});
