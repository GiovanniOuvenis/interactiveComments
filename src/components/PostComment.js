import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";

const PostComment = (props) => {
  const { picturePath, userNameToolkit } = useSelector(
    (store) => store.userRedux
  );
  const [textToSend, setTextToSend] = useState("");
  const [idToSend, setIdToSend] = useState("");
  const [nameOfClass, setNameOfClass] = useState("postCommentForm");
  const trigger = props.propFunction;

  useEffect(() => {
    if (props.commentId) {
      setNameOfClass("postReply");
      setIdToSend(props.commentId);
    }
  });

  const postComment = (e) => {
    e.preventDefault();
    let ep = "comments";

    if (idToSend.length > 0) {
      ep = `comments/${idToSend}`;
    }
    try {
      if (textToSend.length >= 1) {
        const postText = async () => {
          await axios
            .post(
              ep,
              {
                username: userNameToolkit,
                content: textToSend,
              },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then((resp) => {});
        };
        const result = postText();
      }
      setTextToSend("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={nameOfClass} id={props.commentId}>
      <img src={picturePath} alt="logged in user" />

      <input
        type="text"
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></input>

      <button className="button" type="submit" onClick={postComment}>
        send
      </button>
    </form>
  );
};

export default PostComment;
