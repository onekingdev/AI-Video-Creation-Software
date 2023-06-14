import React from 'react';
// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
// import ffmpeg from 'fluent-ffmpeg';

// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function VideoConverter() {
    // const convertVideo = () => {
    //     const command = ffmpeg();
    //     command.input('E:/Working/MattPar/videogenerator/public/Turningscriptsint.mp4');
    //     command.outputOptions(['-c:v libx264', '-c:a aac', '-b:a 128k']);
    //     command.output('output.mp4');
    //     command.run();
    // };
    return (
        <div>
            <button onClick={convertVideo}>Convert Video</button>
        </div>
    );
}

export default VideoConverter;