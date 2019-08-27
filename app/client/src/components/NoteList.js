import React, { Fragment, useEffect, useState } from "react";
import { NoteItem } from "./";
const NoteList = ({ posts, getUser }) => {
  const [postList, setPosts] = useState(posts);
  useEffect(() => {
    setPosts(posts);
  }, [posts]);
  return (
    <Fragment>
      {postList &&
        postList.map((post, i) => (
          <NoteItem key={i} post={post} getUser={getUser} />
        ))}
    </Fragment>
  );
};

export { NoteList };
