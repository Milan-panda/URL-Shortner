// LinkContext.js
import React, { createContext, useContext, useState } from "react";

const LinkContext = createContext();

export const useLinkContext = () => {
  return useContext(LinkContext);
};

export const LinkProvider = ({ children }) => {
  const [newLink, setNewLink] = useState(null);

  const setAndClearNewLink = (link) => {
    setNewLink(link);
  };

  return (
    <LinkContext.Provider value={{ newLink, setAndClearNewLink }}>
      {children}
    </LinkContext.Provider>
  );
};
