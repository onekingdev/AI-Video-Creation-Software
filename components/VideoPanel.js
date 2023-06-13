import { useState } from "react";

export default function VideoPanel(props) {
    const {projectName, setProjectName, setIsVideoPanel, scriptList} = props;
    const [selectedScene, setSelectedScene] = useState();

    const handleClickPrevious = () => {

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
                    <button type="button" onClick={handleClickPrevious} className="text-blue-700 hover:text-blue-800 border border-blue-700 hover:bg-blue-100 font-medium rounded-md text-sm px-4 py-1.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Preview</button>
                    <button type="button" onClick={handleClickDownload} className="text-white bg-gradient-to-r from-blue-500 border border-l-0 border-blue-700 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-md text-sm px-4 py-1.5 text-center">Download</button>
                </div>
            </div>
            <div className="flex-1 w-full flex flex-row">
                <div className="w-5/12 h-full px-5 py-3">
                    <div></div>
                    <div className="flex flex-col gap-4">
                        {
                            scriptList.map((item, index)=>(
                                <div key={`videoscene_${index}`} onClick={()=>setSelectedScene(index)} className={`${selectedScene === index ? 'bg-blue-100' : 'bg-white'} cursor-pointer shadow rounded-md p-2`}>
                                    <span className="text-gray-400 text-xs">Scene&nbsp;{index+1}</span>
                                    <p className="text-md text-gray-800 py-1" dangerouslySetInnerHTML={{__html: item.content}}></p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-7/12 h-full bg-white"></div>
            </div>
        </div>
    )
}