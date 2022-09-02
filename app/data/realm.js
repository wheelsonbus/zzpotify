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
            releases: [],
        };
    }

    static schema = {
        name: "Artist",
        primaryKey: "_id",
        properties: {
            _id: "string",
            name: "string",
            releases: "Release[]",
        },
    };
}

export class Release {
    static generate(release) {
        let type = release.type;
        if (type == null) {
            let duration = 0;
            let maxDuration = 0;
            release.tracks.forEach((track) => {
                duration += track.duration;
                maxDuration = Math.max(track.duration, maxDuration);
            });

            if (
                duration < 30 * 60 &&
                ((release.tracks.length <= 3 && maxDuration >= 10 * 60) ||
                    (release.tracks.length >= 4 && release.tracks.length <= 6))
            ) {
                type = "ep";
            } else if (duration < 30 * 60 && release.tracks.length <= 3) {
                type = "single";
            } else {
                type = "album";
            }
        }

        return {
            _id: uuid(),
            title: release.title,
            date: release.date,
            cover: release.cover,
            tracks: [],
            type: type,
        };
    }

    static schema = {
        name: "Release",
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
                property: "releases",
            },
            type: "string",
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
            release: {
                type: "linkingObjects",
                objectType: "Release",
                property: "tracks",
            },
        },
    };
}

export default createRealmContext({
    schema: [Artist.schema, Release.schema, Track.schema],
});
