'use client';
import axios from "axios";
import {useEffect} from "react";

export default function FilePage({params}) {
    const filename = params.filename;

    useEffect(() => {
        axios.get('/api/transcribe?filename=' + filename)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error fetching transcription:', error);
            });
    }, [filename]);
    return (
        <div>{filename}</div>
    );
}