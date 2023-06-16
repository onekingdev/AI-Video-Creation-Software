import { useCallback, useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Pica from 'pica';
import Modal from 'react-modal';
import { FaRegWindowClose, FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";


const videos = [
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/NrM0QFs3gilniuv44/videoblocks-home-interior-walk-through-bedroom-classic-apartment_r5wrlkbhl__8139fc956e4d681b26b4198d2b9e2a23__P720.mp4?type=preview&origin=VIDEOBLOCKS&timestamp_ms=1686703948349&publicKey=test_a2208bdac9fd6f5d06aeb4c23b8b6085534e0da40282d464c10816da279&apiVersion=2.0&stockItemId=3881136&resolution=720p&endUserId=6c7e19b29adc28eb35bd84c121acb47842dea1cc&projectId=aivideogenerator&searchId=c10abacf-8b9e-45ad-ac0d-69f912558369&searchPageId=a9fb0686-d46d-4b71-80dc-c7ced2ab3143",
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/family-and-baby-in-bed_xyswo8h5__d17ed7e6e7895f71bec4768899293920__P720.mp4?type=preview&origin=VIDEOBLOCKS&timestamp_ms=1686703946831&publicKey=test_a2208bdac9fd6f5d06aeb4c23b8b6085534e0da40282d464c10816da279&apiVersion=2.0&stockItemId=277506&resolution=720p&endUserId=6c7e19b29adc28eb35bd84c121acb47842dea1cc&projectId=aivideogenerator&searchId=0eec9922-46f3-423c-8d30-4d18e9490e8c&searchPageId=1b0ffda8-6581-43f6-a8de-8acd3ed7df16",
];

export default function VideoPanel(props) {
    const {projectName, setProjectName, setIsVideoPanel, scriptList} = props;
    const [selectedScene, setSelectedScene] = useState(scriptList[0]);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    
    const handleClickPreview = () => {
        setIsPreviewModalOpen(true);
    }

    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
    }

    const handleClickDownload = () => {
        
    }


    return (
        <div className="px-6 pt-[70px] mx-auto flex flex-col h-screen">
            <div className="flex flex-row items-center justify-between bg-white -mx-6 px-10 border-y border-gray-300 p-1">
                <div>
                    <label htmlFor="project_name" className="block text-sm font-medium text-gray-500 dark:text-white">Project Name</label>
                    <input type="text" id="project_name" value={projectName} onChange={e=>setProjectName(e.target.value)} className="block font-bold bg-white text-gray-800 text-lg rounded-lg focus:ring-white focus:ring-0 focus:outline-none focus:border-white block w-full pt-2 pb-1" />
                </div>
                <div className="flex flex-row gap-2 h-fit">
                    <button type="button" onClick={()=>setIsVideoPanel(false)} className="text-blue-700 hover:text-blue-800 border border-blue-700 hover:bg-blue-100 font-medium rounded-md text-sm px-4 py-1.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Previous</button>
                    <button type="button" onClick={handleClickPreview} className="text-blue-700 hover:text-blue-800 border border-blue-700 hover:bg-blue-100 font-medium rounded-md text-sm px-4 py-1.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Preview</button>
                    <button type="button" onClick={handleClickDownload} className="text-white bg-gradient-to-r from-blue-500 border border-l-0 border-blue-700 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-md text-sm px-4 py-1.5 text-center">Download</button>
                </div>
            </div>
            <div className="flex-1 w-full flex flex-row">
                <div className="w-5/12 h-full px-5 py-3">
                    <div></div>
                    <div className="flex flex-col gap-4">
                        {
                            scriptList.map((item, index)=>(
                                <div key={`videoscene_${index}`} onClick={()=>setSelectedScene(item)} className={`${selectedScene.paragraphId === item.paragraphId ? 'bg-blue-100' : 'bg-white'} cursor-pointer shadow rounded-md p-2`}>
                                    <span className="text-gray-400 text-xs">Scene&nbsp;{index+1}</span>
                                    <p className="text-sm text-gray-800 py-1" dangerouslySetInnerHTML={{__html: item.content}}></p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-7/12 h-full bg-white">
                    <VideoComponent src={selectedScene.storyblocks[0].preview_urls._720p} selectedScene={selectedScene}/>
                    <div className="flex flex-row gap-4 px-10">
                        {
                            scriptList.map((item, index)=>(
                                <div key={`videoitemscene_${index}`} onClick={()=>setSelectedScene(item)} className={`${selectedScene.paragraphId === item.paragraphId ? 'bg-blue-100' : 'bg-black'} rounded-md cursor-pointer`}>
                                    <img className={`${selectedScene.paragraphId === item.paragraphId ? '':'opacity-[0.3]'} rounded-md w-36`} src={item.storyblocks[0].thumbnail_url} alt={item.storyblocks[0].title} /> 
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isPreviewModalOpen}
                onRequestClose={closePreviewModal}
                style={{content:{width: '70%', height:'0', paddingBottom: '39%', margin: 'auto', overflowY: 'hidden'}}}
            >
                <PreviewVideoComponent isPlay={isPlay} closePreviewModal={closePreviewModal} scriptList={scriptList} setIsPlay={setIsPlay}/>
            </Modal>
        </div>
    )
}

function PreviewVideoComponent({isPlay, setIsPlay, closePreviewModal, scriptList}) {
    console.log(scriptList)
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        const videoElement = videoRef.current;
        if(videoElement){
            videoElement.src = scriptList[currentVideoIndex].storyblocks[0].preview_urls._720p;
            videoElement.play();
        
            // Set up the onended event to play the next video when the current video ends
            videoElement.onended = () => {
                playNextVideo();
            };
        
            return () => {
              // Clean up the event listener when the component unmounts
              videoElement.onended = null;
            };
        }
        // Play the first video on load
    }, [currentVideoIndex]);
    
    function playNextVideo() {
        console.log('wejfo')
        let newIndex = currentVideoIndex + 1;
    
        if (newIndex === videos.length) {
          // If we have played all the videos, loop back to the beginning
          newIndex = 0;
        }
    
        setCurrentVideoIndex(newIndex);
    }

    const onLoadMetadata = () => {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        if(!!canvasRef.current) drawFrame();
    }

    const handlePreviewPlay = () => {
        setIsPlay(!isPlay);
        isPlay ? videoRef.current.pause() : videoRef.current.play();
    }


    const drawFrame = () => {
        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        }
    }


    return (
        <div className="w-full pb-[56.25%] relative flex">
            <span className='cursor-pointer bg-[rgba(0,0,0,0.3)] absolute right-0 z-20 w-10 h-10 rounded-full flex items-center justify-center -translate-y-[50%] top-[50%] -translate-x-[50%] left-[50%]' onClick={handlePreviewPlay}>
                {isPlay ? <FaRegPauseCircle className='w-7 h-7 text-white'/> : <FaRegPlayCircle className='w-7 h-7 text-white' />}
            </span>
            <canvas ref={canvasRef} className='z-10 absolute w-full -translate-y-[50%] top-[50%] -translate-x-[50%] left-[50%]'></canvas>
            <button className="absolute bg-[rgba(0,0,0,0.3)] w-10 h-10 right-0 m-2 z-20 flex items-center justify-center" onClick={closePreviewModal}><FaRegWindowClose className='w-7 h-7 text-white'/></button>
            <video ref={videoRef} controls={true} onLoadedMetadata={onLoadMetadata} className='invisible absolute'></video>
            <img src='./temp/1.png' className='z-10 absolute w-full -translate-y-[50%] top-[50%] -translate-x-[50%] left-[50%]'/>
        </div>
    )
}

function VideoComponent({src, selectedScene}) {

    const textRef = useRef();

    const onButtonClick = useCallback(() => {
        if (textRef.current === null) {
          return
        }
    
        toPng(textRef.current, { cacheBust: true, })
        .then((dataUrl) => {
            resizeImage(dataUrl, 1280, 720)
            .then(data => {
                const link = document.createElement('a')
                link.download = 'my-image-name.png'
                link.href = data
                link.click()
            })
            .catch(err=>console.log(err))
        })
        .catch((err) => {
            console.log(err)
        })
        
    }, [textRef])

    const resizeImage = (base64Str, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = base64Str;
        
            img.onload = () => {
                const pica = new Pica();
                let canvas = document.createElement('canvas');
                canvas.width = maxWidth;
                canvas.height = maxHeight;

                pica
                .resize(img, canvas, {
                    unsharpAmount: 80,
                    unsharpRadius: 0.6,
                    unsharpThreshold: 2
                })
                .then(() => {
                    resolve(canvas.toDataURL());
                })
                .catch(err => {
                    reject(err);
                });
            };
        
            img.onerror = err => reject(err);
        });
    };

    return (
        <div className="p-10 w-full">
            {/* <button onClick={onButtonClick}>Click ME!</button> */}
            <div className="relative pb-[56.25%] z-0">
                <video className="rounded-md absolute top-0 right-0" key={src} autoPlay controls={false}>
                    <source src={src} type="video/mp4" />
                </video>
                <div ref={textRef} className="h-full w-full z-10 absolute">
                    <div className="absolute top-[80%] left-[10%] w-[80%]">
                        <div 
                            className="text-white text-3xl bg-[rgba(0,0,0,0.4)] text-center"  
                            dangerouslySetInnerHTML={{__html: selectedScene.content}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}