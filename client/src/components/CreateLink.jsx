import React, { useState } from "react";
import { useLinkContext } from "../context/LinkContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLink = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [checkValidURL, setCheckValidURL] = useState(false);
  const { setAndClearNewLink } = useLinkContext();

  function isValidURL(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  }

  const handleCreateNewLink = async () => {
    if (isValidURL(originalURL)) {
      const response = await fetch("/api/url/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({
          url: originalURL,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setAndClearNewLink(responseData);
        setOriginalURL("")
        toast.success("Successfully created new shortened URL", {
          position: "bottom-right",
          className: "foo-bar",
        });
      } else {
        toast.success(responseData.error, {
          position: "bottom-right",
          className: "foo-bar",
        });
      }
    } else{
      setCheckValidURL(true)
      if (checkValidURL) {
        toast.error("Please enter URL in correct format. Eg: http://example.com", {
          position: "bottom-right",
          className: "foo-bar",
        });
      }
      
    }
  };

  return (
    <>
    <div className="flex w-[50%] gap-2">
      <input
        type="text"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
        className="bg-white border border-black text-black text-sm rounded-lg outline-none block w-full p-3"
        placeholder="Enter your link here..."
      />
      <button
        className="bg-white border border-black text-black rounded-lg p-3"
        onClick={handleCreateNewLink}
      >
        Generate
      </button>
    </div>
    <ToastContainer />
    </>
  );
};

export default CreateLink;
