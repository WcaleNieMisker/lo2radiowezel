require('dotenv').config();
import React, { useState, useEffect } from 'react';
import LikeDislikeManager from './api.js';

let equal;
let minutes;

const minsToTime = (duration) => {
    let seconds = Math.round(duration * 60);
    minutes = 0;
    equal;
    while (seconds > 60) {
        minutes += 1;
        seconds -= 60;
        equal = `${minutes} minut(y) i ${seconds} sekund(y)`;
        if (minutes === 1 && seconds === 1) {
            equal = `${minutes} minuta i ${seconds} sekunda`;
        } else if (seconds === 0) {
            equal = `${minutes} minut(y)`;
        } else if (minutes === 1 && seconds === 0) {
            equal = `${minutes} minuta`;
        } else if (minutes > 1 && seconds === 1) {
            equal = `${minutes} minut(y) i ${seconds} sekunda`;
        } else if (minutes === 1 && seconds > 1) {
            equal = `${minutes} minuta i ${seconds} sekund(y)`;
        }
    }
    return equal;
}

const Item = ({ item, elements, refresh }) => {
    const [likes, setLikes] = useState(item.likes);
    const [dislikes, setDislikes] = useState(item.dislikes);

    const refreshData = () => {
        const element = refresh.find((el) => el.song_id === item.song_id);
        if (element) {
            setLikes(element.likes);
            setDislikes(element.dislikes);
        }
    }

    useEffect(() => {
        refreshData();
    }, [refresh])

    let likePercent;
    if (likes === 0 && dislikes === 0) {
        likePercent = 50;
    } else {
        likePercent = (likes / (likes + dislikes)) * 100;
    }

    if (isNaN(likePercent)) {
        likePercent = 50;
    }

    return (
        <div className="grid-col-item">
            <LikeDislikeManager item={item} elements={elements} refresh={refresh} />
            <div className="featured_info" data-info>
                <a target="_blank" href={item.track_link} data-title>{item.name}</a>
                <a target="_blank" href={item.artist_link} data-artist>{item.artist}</a>
                <a target="_blank" href={item.album_link} data-album>{item.album}</a>
                <p target="_blank" data-duration>Długość: {minsToTime(item.duration_in_mins)}</p>
                {/* <p target="_blank" data-popularity-desc>Popularność: {Math.round(likePercent) + "%"}</p> */}
                {/* <ProgressBar item={item} refresh={refresh} /> */}
            </div>
        </div>
    )
}

export default Item;