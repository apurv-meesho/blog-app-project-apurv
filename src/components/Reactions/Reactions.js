import React, { useState } from "react";
import { incReaction } from "../../redux/Actions/IncrementReaction";
import { useDispatch, useSelector } from "react-redux";
import "./Reactions.css";

function Reactions({ post }) {
  const initialReactionsAll = useSelector((state) => state.reactions);
  const dispatch = useDispatch();
  const initialReactions = initialReactionsAll.find((item) => {
    if (item.id == post.id) {
      return item;
    }
  });

  const [reactions, setReactions] = useState(initialReactions);
  const incrementReaction = (reactionType) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [reactionType]: prevReactions[reactionType] + 1,
    }));
    dispatch(
      incReaction({
        ...reactions,
        [reactionType]: reactions[reactionType] + 1,
      })
    );
  };
  return (
    <div className="reaction-buttons">
      <button
        className="r-button"
        onClick={() => incrementReaction("thumbsUp")}
      >
        👍 {reactions.thumbsUp}
      </button>
      <button className="r-button" onClick={() => incrementReaction("heart")}>
        ❤️ {reactions.heart}
      </button>
      <button
        className="r-button"
        onClick={() => incrementReaction("insightful")}
      >
        🔍 {reactions.insightful}
      </button>
      <button className="r-button" onClick={() => incrementReaction("funny")}>
        😄 {reactions.funny}
      </button>
    </div>
  );
}

export default Reactions;
