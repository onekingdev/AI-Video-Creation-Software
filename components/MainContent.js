import { FaAlignLeft, FaCheck, FaVideo, FaPhotoVideo, FaPenSquare } from "react-icons/fa";
import { useRouter } from "next/router";

export default function MainContent() {
    const router = useRouter();
    
    const handleClickProceed = () => {
        router.push('/textinput');
    }

    return (
        <div className="px-6 pt-[70px] mx-auto">
            <div className="px-16 py-12">
                <div className="flex flex-row items-center">
                    <img src="./wave_hand.png" className="h-8 mr-3" alt="wave_hand" />
                    <span className="font-bold text-gray-700">Welcome Pictory</span>
                </div>
                <hr className="my-3"/>
                <p className="text-lg text-purple-600 ml-12">Which content would you like to repurpose into videos?</p>
                <div className="bg-white mt-20 rounded-2xl relative h-72">
                    <div className="w-full bottom-3 z-10 absolute px-20">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col w-56 gap-2">
                                <div className="flex flex-col justify-between w-56 h-56 bg-[#FFB2B2] p-4 rounded-2xl">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold w-16">Script to Video</p>
                                        <FaAlignLeft className="w-7 h-7"/>
                                    </div>
                                    <p className="text-sm text-center p-4">Start typinig or Copy paste your script</p>
                                    <button type="button" onClick={handleClickProceed} className="w-fit self-center px-5 py-1.5 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed</button>
                                </div>
                                <div className="flex flex-col gap-1 self-center">
                                    <p className="text-xs font-bold text-gray-700">Recommended for:</p>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Education videos
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Listicle videos
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Coaching videos
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Step by step guides
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-56 gap-2">
                                <div className="flex flex-col justify-between w-56 h-56 bg-[#F9C114] p-4 rounded-2xl">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold w-16">Article to Video</p>
                                        <FaPenSquare className="w-7 h-7"/>
                                    </div>
                                    <p className="text-sm text-center p-4">Start typinig or Copy paste your script</p>
                                    <button type="button" onClick={handleClickProceed} class="w-fit self-center px-5 py-1.5 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed</button>
                                </div>
                                <div className="flex flex-col gap-1 self-center">
                                    <p className="text-xs font-bold text-gray-700">Recommended for:</p>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Blogs
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Press releases
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/>Any HTML article
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-56 gap-2">
                                <div className="flex flex-col justify-between w-56 h-56 bg-[#B984FF] p-4 rounded-2xl">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold w-24">Edit Videos using Text</p>
                                        <FaVideo className="w-7 h-7"/>
                                    </div>
                                    <p className="text-sm text-center p-4">Input video from various sources</p>
                                    <button type="button" onClick={handleClickProceed} class="w-fit self-center px-5 py-1.5 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed</button>
                                </div>
                                <div className="flex flex-col gap-1 self-center">
                                    <p className="text-xs font-bold text-gray-700">Recommended for:</p>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/> Add subtitles automatically
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/> Cut portions of video
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/> Create video highlights
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/> Add logo, intro, & outro
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-56 gap-2">
                                <div className="flex flex-col justify-between w-56 h-56 bg-[#FFB2B2] p-4 rounded-2xl">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold w-16">Visuals to Video</p>
                                        <FaPhotoVideo className="w-7 h-7"/>
                                    </div>
                                    <p className="text-sm text-center p-4">Drag and drop file or browse computer</p>
                                    <button type="button" onClick={handleClickProceed} class="w-fit self-center px-5 py-1.5 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed</button>
                                </div>
                                <div className="flex flex-col gap-1 self-center">
                                    <p className="text-xs font-bold text-gray-700">Recommended for:</p>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center">
                                        <FaCheck className="text-purple-800 w-3 h-3"/> Create short videos using
                                    </span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center pl-4">your existing images and</span>
                                    <span className="text-xs text-gray-500 flex flex-row gap-1 items-center pl-4">video clips</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}