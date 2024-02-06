import React, { useState, useEffect } from 'react';

const ProgressBar = ({ item, refresh }) => {
    const [likes, setLikes] = useState(item.likes);
    const [dislikes, setDislikes] = useState(item.dislikes);
    
    const refreshData = async () => {
        const element = refresh.find((el) => el.song_id === item.song_id);
        if (element) {
            setLikes(element.likes);
            setDislikes(element.dislikes)
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
        <div data-progress className="progress">
            <div data-progress-value className="progress-value" style={{width: likePercent + "%"}}></div>
        </div>
    )
}

export default ProgressBar