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
            albums: [],
        };
    }

    static schema = {
        name: "Artist",
        primaryKey: "_id",
        properties: {
            _id: "string",
            name: "string",
            albums: "Album[]",
            eps: "EP[]",
            singles: "Single[]",
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

export class EP {
    static generate(ep) {
        return {
            _id: uuid(),
            title: ep.title,
            date: ep.date,
            cover: ep.cover,
            tracks: [],
        };
    }

    static schema = {
        name: "EP",
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
                property: "eps",
            },
        },
    };
}

export class Single {
    static generate(single) {
        return {
            _id: uuid(),
            title: single.title,
            date: single.date,
            cover: single.cover,
            tracks: [],
        };
    }

    static schema = {
        name: "Single",
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
                property: "singles",
            },
        },
    };
}

export class Track {
    static generate(track) {
        return {
            _id: uuid(),
            title: track.title,
            duration: track.duration,
        };
    }

    static schema = {
        name: "Track",
        primaryKey: "_id",
        properties: {
            _id: "string",
            title: "string",
            duration: "int",
        },
    };
}

export default createRealmContext({
    schema: [
        Artist.schema,
        Album.schema,
        EP.schema,
        Single.schema,
        Track.schema,
    ],
});
