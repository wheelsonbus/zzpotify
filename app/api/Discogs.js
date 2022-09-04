/**
 * Discogs API handler
 *
 * @format
 */

import {useState, useEffect, useCallback} from "react";

const consumerKey = "WwcXlaiWIiJJDUpoVHXL";
const consumerSecret = "tDkXKPEgaoCSdTPHSxSCdYKUhgdEmZiN";

export default class Discogs {
    static queue = [];
    static timeout = 1 * 1000;
    static isProcessing = false;

    constructor() {
        if (this instanceof Discogs) {
            throw Error(
                "Attempting to instantiate Discogs (static class) object.",
            );
        }
    }

    static request = (promise) => {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promise,
                resolve,
                reject,
            });

            if (!this.isProcessing) {
                this.isProcessing = true;
                setTimeout(() => {
                    this.process();
                }, this.timeout);
            }
        });
    };

    static process = async () => {
        this.isProcessing = true;

        const request = this.queue.shift();
        try {
            request.resolve(await request.promise());
        } catch (error) {
            request.reject(error);
        }

        if (this.queue.length > 0) {
            setTimeout(() => {
                this.process();
            }, this.timeout);
        } else {
            this.isProcessing = false;
        }
    };
}

export const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const f = useCallback(async (url) => {
        setLoading(true);
        try {
            setData(await Discogs.request(async () => await get(url)));
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }, []);

    return {
        f,
        data,
        error,
        loading,
    };
};

export const useFetchArtist = (callback) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchArtist = useCallback(async (id) => {
        setLoading(true);
        let artist = null;
        try {
            let response = null;

            response = await Discogs.request(
                async () => await get("https://api.discogs.com/artists/" + id),
            );
            artistData = await response.json();

            response = await Discogs.request(
                async () => await get(artistData.releases_url),
            );
            artistReleasesData = await response.json();
            let releases = [];
            for (const artistReleaseData of artistReleasesData.releases) {
                if (artistReleaseData.role !== "Main") {
                    continue;
                }

                if (artistReleaseData.type === "master") {
                    response = await Discogs.request(
                        async () =>
                            await get(
                                "https://api.discogs.com/releases/" +
                                    artistReleaseData.main_release,
                            ),
                    );
                } else {
                    response = await Discogs.request(
                        async () => await get(artistReleaseData.resource_url),
                    );
                }
                releaseData = await response.json();

                let tracks = [];
                for (const trackData of releaseData.tracklist) {
                    const hms = trackData.duration.split(":");
                    while (hms.length < 3) {
                        hms.unshift("00");
                    }
                    const duration = +hms[0] * 60 * 60 + +hms[1] * 60 + +hms[2];
                    tracks.push({title: trackData.title, duration: duration});
                }

                releases.push({
                    title: releaseData.title,
                    date: releaseData.year.toString(),
                    cover: releaseData.images ? releaseData.images[0].uri : "",
                    tracks: tracks,
                });
            }
            artist = {name: artistData.name, releases: releases};
            setData(artist);
        } catch (error) {
            setError(error);
        }
        setLoading(false);

        if (callback != null) {
            if (typeof callback === "function") {
                switch (callback.length) {
                    case 0:
                        callback();
                        break;
                    case 1:
                        callback(artist);
                        break;
                    case 2:
                        callback(artist, error);
                        break;
                    default:
                        throw new Error(
                            "Callback takes an invalid number of arguments",
                        );
                }
            } else {
                throw new Error(
                    "Callback is not a function. Received: " + callback,
                );
            }
        }
    }, []);

    return {
        fetchArtist,
        data,
        error,
        loading,
    };
};

const get = async (url) => {
    let response = null;
    try {
        console.log("Fetching data from " + url);
        response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Discogs key=" + consumerKey + ", secret=" + consumerSecret,
            },
        });
    } catch (error) {
        console.error(error);
    }
    return response;
};
