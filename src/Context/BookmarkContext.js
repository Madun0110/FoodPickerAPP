import React, { createContext, useState } from "react";

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {

  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (item) => {
    setBookmarks([...bookmarks, item]);
  };

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((item) => item.id !== id));
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};