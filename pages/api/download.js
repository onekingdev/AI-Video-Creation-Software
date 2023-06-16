import axios from 'axios';
import fs from 'fs';
import path from 'path';


export default async function handler(req, res) {
    // const { url } = req.body; // The URL of the file to download
    console.log("fahwefawpefjowefjaoiw")
    const url = 'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r6uQGb9/extreme-sport-hispanic-athlete-jumping-during-karate-fight_ru_iemtqg__a34dc2ff64724479a32e45eb408e2caf__P720.mp4?type=preview&origin=VIDEOBLOCKS&timestamp_ms=1686638485518&publicKey=test_a2208bdac9fd6f5d06aeb4c23b8b6085534e0da40282d464c10816da279&apiVersion=2.0&stockItemId=3192860&resolution=720p&endUserId=6c7e19b29adc28eb35bd84c121acb47842dea1cc&projectId=aivideogenerator&searchId=849453cd-c3ac-4822-9cba-9776aa8a7989&searchPageId=21f3df2e-1977-4eee-88be-5aee5eedefbf'
    try {
        const response = await axios.get(url, { responseType: 'stream' });
        const filePath = path.join(process.cwd(), 'public', 'video.mp4');
        const outputStream = fs.createWriteStream(filePath);

        response.data.pipe(outputStream);

        outputStream.on('close', () => {
            console.log('File saved successfully!');
            res.status(200).json({ message: 'File downloaded successfully!' });
        });

        outputStream.on('error', (error) => {
            console.log(error);
            res.status(500).json({ error: 'Failed to save the file.' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to download the file.' });
    }
}


// async function saveBase64Image(base64String, fileName) {
//     // Extract the data and content type from the base64 string
//     const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
//     const contentType = matches[1];
//     const dataBuffer = Buffer.from(matches[2], 'base64');
  
//     // Create the path to the public directory and ensure it exists
//     const publicPath = path.resolve('./public');
//     await promisify(fs.mkdir)(publicPath, { recursive: true });
  
//     // Write the file to disk
//     const filePath = path.join(publicPath, fileName);
//     await promisify(fs.writeFile)(filePath, dataBuffer);
  
//     // Return the URL to the saved file
//     return `/${fileName}`;
// }
  
//   // Example usage
// const base64String = '...'; // Replace with your actual base64 string
// const fileName = 'my-image.png'; // Replace with your desired filename
// saveBase64Image(base64String, fileName)
// .then((url) => console.log(`Image saved to ${url}`))
// .catch((err) => console.error(err));