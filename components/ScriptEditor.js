import { useState } from "react";
import { useRouter } from "next/router";
import VideoPanel from "./VideoPanel";
import { FaRegCheckCircle, FaCheck, FaVideo, FaPhotoVideo, FaPenSquare } from "react-icons/fa";

export default function MainContent() {
    const [script, setScript] = useState('');
    const [scriptList, setScriptList] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [scriptError, setScriptError] = useState(false);
    const [isVideoPanel, setIsVideoPanel] = useState(false);
    const router = useRouter();

    const handleClickProceed = async () => {
        let lines = script.split(".");
        let linesNew = [];
        lines = lines.map(item=>{
            const newItems = item.split("\n");
            linesNew = [...linesNew, ...newItems];
        });
        linesNew = linesNew.filter(item=>item !== '');
        if(!linesNew.length) {
            setScriptError(true);
            return;
        }
        const scriptItems = linesNew.map(item=>{
            const scriptItem = {
                paragraphId: crypto.randomUUID(),
                content: item
            };
            return scriptItem;
        })

        setProjectName(scriptItems[0].content.substring(0, 15));

        /*--------- Get keywords from script ---------*/
        var myHeaders = new Headers();
        myHeaders.append("apikey", "1PJC3EuGd5EJvllkWZJTzTZEIggR4QPS");

        Promise.all(scriptItems.map(async item=>{
            var requestOptions = {
                method: 'POST',
                redirect: 'follow',
                headers: myHeaders,
                body: item.content
            };
            try {
                const res = await fetch("https://api.apilayer.com/keyword", requestOptions);
                const data = await res.json();
                const keywords = data.result.filter(key=>!key.text.includes(' '));
                const itemNew = {...item, keywords};
                return itemNew;
            } catch (err) {
                console.error(err);
            }        
        })).
        then(result=>{
            const scriptItems = result.map(item=>{
                const contentWithBoldKeywords = item.keywords.reduce((acc, keyword) => {
                    const regex = new RegExp(keyword.text, 'gi');
                    return acc.replace(regex, `<strong class="text-blue-500">${keyword.text}</strong>`);
                }, item.content);
                const itemNew = {...item, content: contentWithBoldKeywords};
                return itemNew;
            })
            setScriptList(scriptItems);
            console.log(scriptItems);
            setIsVideoPanel(true);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const handleChangeScript = e => {
        setScript(e.target.value);

        let lines = e.target.value.split(".");
        let linesNew = [];
        lines = lines.map(item=>{
            const newItems = item.split("\n");
            linesNew = [...linesNew, ...newItems];
        });
        linesNew = linesNew.filter(item=>item !== '');

        if(linesNew.length) setScriptError(false);
        else setScriptError(true);
    }

    const handleClickClose = () => {
        router.push('/')
    }

    return (
        <>
            {
                isVideoPanel ?
                <>
                    <VideoPanel 
                        projectName={projectName} 
                        setProjectName={setProjectName}
                        scriptList={scriptList}
                        setIsVideoPanel={setIsVideoPanel}
                    />
                </>
                :
                <div className="px-6 pt-[70px] mx-auto flex flex-col h-screen">
                    <div className="flex flex-row justify-between items-center my-5">
                        <h1 className="text-2xl">Script editor</h1>
                        <div className="flex flex-row justify-between items-center">
                            {/* <span className="flex flex-row items-center gap-1 mr-3">Saved<FaRegCheckCircle className="text-green-500"/></span> */}
                            <button type="button" onClick={handleClickClose} className="text-blue-700 hover:text-blue-800 border border-blue-700 hover:bg-blue-100 font-medium rounded-l-lg text-sm px-4 py-1.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Cancel</button>
                            <button type="button" onClick={handleClickProceed} className="text-white bg-gradient-to-r from-blue-500 border border-l-0 border-blue-700 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-r-lg text-sm px-4 py-1.5 text-center">Proceed</button>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl flex-1 p-5 flex flex-col">
                        <input type="text" id="base-input" placeholder="Enter your video name" className="bg-white text-gray-900 text-sm rounded-lg focus:ring-white focus:ring-0 focus:outline-none focus:border-white block w-full py-2.5" />
                        <hr />
                        <textarea id="message" value={script} onChange={handleChangeScript} className="resize-none flex-1 block py-6 w-full text-sm text-gray-800 bg-white rounded-lg border border-white focus:ring-white focus:border-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start typing here..."></textarea>
                        {scriptError && (
                            <span className="text-red-500">
                                Script is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-row justify-between mt-5 mb-8">
                        <p className="text-base">Spell-check</p>
                        <div className="text-base">Characters&nbsp;<span className="text-purple-600">{script.length}</span></div>
                    </div>
                </div>
            }
        </>
    )
}