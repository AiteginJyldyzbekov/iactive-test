import React, { useEffect, useMemo, useRef } from 'react';
import scss from './CardsBlock.module.scss'
import BlockCard from './blockCard/BlockCard';
import useMessages from '../../helpers/hooks/useMessage';
import { useSelectorMessages } from '../../store/selectors';
import { LoadingStatus } from '../../types/types';
import { CircularProgress } from '@mui/material';

const CardsBlock: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | any>();
  const { messages, loading, ascending } = useSelectorMessages()
  const { getFirstMessages, getOldMessage, getNewMessage, sortMessages } = useMessages(messages)

  useEffect(() => {
    getFirstMessages()
  }, [])

  useEffect(() => {
    const lastMessageId = messages.at(-1)?.id;

    if (lastMessageId) {
      const timer = setInterval(() => getNewMessage(), 5000);

      return () => clearInterval(timer);
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight; 
      const documentHeight = document.documentElement.scrollHeight; 

      if (ascending === "ASC") {
        if (scrollY + windowHeight >= documentHeight) {
          getOldMessage()
        }
      } else if ("DESC") {
        const scrollTop = 0;
        if (scrollY <= scrollTop) {
          getOldMessage()
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [ascending]);

  const renderMessages = useMemo(() =>
    messages.map((messages, index) => (
      <BlockCard key={`${messages.author}_${index}`} {...messages} />
    ))
    , [messages])

  const renderLoader = useMemo(() => {
    if (loading == LoadingStatus.pending) {
      return (
        <div className={scss.loader__container}><CircularProgress /></div>
      )
    }
  }, [loading])

  return (
    <div className='container'>
      <div ref={containerRef} className={scss.messages__wrapper}>
        {renderLoader}
        {renderMessages}
      </div>
    </div>
  )
};

export default CardsBlock;
