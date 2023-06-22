import React, { useState, useEffect } from 'react';
import BlockCardUi from './BlockCardUi';
import { BlockCardContainerProps } from '../../../types/types';

const BlockCardContainer: React.FC<BlockCardContainerProps> = React.memo(({
  id,
  attachments,
  author,
  channel,
  content,
  date,
}) => {
  const stars = localStorage.getItem("star") as string;
  const parsedStars = JSON.parse(stars) || {};
  const [isLiked, setIsLiked] = useState<boolean>(Boolean(parsedStars[id]));

  useEffect(() => {
    localStorage.setItem('star', JSON.stringify({ ...parsedStars, [id]: isLiked }));
  }, [isLiked, id, parsedStars]);

  const addToFavorite = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <BlockCardUi
      attachments={attachments}
      author={author}
      channel={channel}
      content={content}
      date={date}
      id={id}
      isLiked={isLiked}
      onAddToFavorite={addToFavorite}
    />
  );
})

export default BlockCardContainer;