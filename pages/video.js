import React, { useCallback, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

function VideoConverter() {
    const ref = useRef();

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
          return
        }
    
        toPng(ref.current, { cacheBust: true, })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'my-image-name.png'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
    }, [ref])

    
    const handleDownload = () => {
        fetch('https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r6uQGb9/extreme-sport-hispanic-athlete-jumping-during-karate-fight_ru_iemtqg__a34dc2ff64724479a32e45eb408e2caf__P720.mp4?type=preview&origin=VIDEOBLOCKS&timestamp_ms=1686638485518&publicKey=test_a2208bdac9fd6f5d06aeb4c23b8b6085534e0da40282d464c10816da279&apiVersion=2.0&stockItemId=3192860&resolution=720p&endUserId=6c7e19b29adc28eb35bd84c121acb47842dea1cc&projectId=aivideogenerator&searchId=849453cd-c3ac-4822-9cba-9776aa8a7989&searchPageId=21f3df2e-1977-4eee-88be-5aee5eedefbf')
          .then(response => response.blob())
          .then(blob => {
            // Create downloadable object from blob
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'video.mp4');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(() => alert('Unable to download file.'));
    }

    return (
        <>
            <div ref={ref}>
                <h1 className='text-red-300'>Hello world</h1>
            </div>
            <button onClick={onButtonClick}>Click me</button>
            <button onClick={handleDownload}>Download Video</button>
        </>
    );
}

export default VideoConverter;