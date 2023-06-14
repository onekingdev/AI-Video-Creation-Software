// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import ffmpeg from 'fluent-ffmpeg';
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
import { join } from 'path';
import { createReadStream } from 'fs';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// console.log(ffmpegInstaller.path, ffmpegInstaller.version); 

export default async function handler(req, res) {
  
  const convertVideo = () => {
    const command = ffmpeg();
    command.input('E:/Working/MattPar/videogenerator/public/Turningscriptsint.mp4');
    command.outputOptions(['-c:v libx264', '-c:a aac', '-b:a 128k']);
    command.output('output.mp4');
    command.on('end', () => {
      console.log("faowjei")
      const filePath = join(process.cwd(), 'output.mp4');
      const stream = createReadStream(filePath);
      stream.pipe(res);
    });
    command.run();
  };

  convertVideo();

  res.json("Hello world");
}
