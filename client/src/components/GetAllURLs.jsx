import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLinkContext } from "../context/LinkContext";

const GetAllURLs = () => {
  const [allURLs, getAllURLs] = useState(null);
  const { newLink, setAndClearNewLink } = useLinkContext();


  // Need to change
  const baseURL = "http://localhost:8080"

  useEffect(() => {
    const getURL = async () => {
      const response = await fetch(" /api/url/get/all", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      const data = await response.json();
      getAllURLs(data);
    };

    getURL();
  }, [newLink]);

  //Copy to Clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied to clipboard:', text))
      .catch((err) => console.error('Unable to copy to clipboard:', err));
  }

  const handleCopy = (item)=>{
    copyToClipboard(`${baseURL}/${item.shortUrl}`)
  }

  return (
    <div className="w-[50%]">
      <ul className="grid min-h-[66.5vh] auto-rows-min gap-3">
      {
        allURLs?.map((item)=>(
          <li key={item._id} className="border-gray-50 relative rounded-lg border-2 bg-white p-3 pr-1 shadow transition-all hover:shadow-md sm:p-4">
            <div className="relative flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex max-w-fit items-center space-x-2">
                  <a href={`${baseURL}/${item.shortUrl}`} target="_blank">localhost:8080/{item.shortUrl}</a>
                  <button onClick={()=>handleCopy(item)} className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95">
                    <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" className="text-gray-700 transition-all group-hover:text-blue-800"><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path></svg>
                  </button>
                </div>
                <a href={item.originalUrl} target="_blank">{item.originalUrl}</a>
              </div>
              <div className="flex items-center space-x-2">
                <a className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100 cursor-pointer">
                  <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="14" height="14" className="h-4 w-4"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
                  <p className="whitespace-nowrap text-sm text-gray-500">{item.visitHistory.length} Clicks</p>
                </a>
              </div>
            </div>
          </li>
        ))
      }
      </ul>
    </div>
  );
};

export default GetAllURLs;
