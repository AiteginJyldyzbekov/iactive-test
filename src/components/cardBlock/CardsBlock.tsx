import React, { useEffect, useMemo, useState } from 'react';
import scss from './CardsBlock.module.scss'
import BlockCard from './blockCard/BlockCard';
import useMessages from '../../helpers/hooks/useMessage';
import { useSelectorMessages } from '../../store/selectors';
import { LoadingStatus } from '../../types/types';
import { CircularProgress } from '@mui/material';

const CardsBlock: React.FC = () => {
  const { messages, loading, ascending } = useSelectorMessages()
  const { getFirstMessages, getOldMessage, getNewMessage, sortMessages } = useMessages(messages)
  const [delayLoad, setDelayLoad] = useState(false)

  useEffect(() => {
    getFirstMessages()
  }, [])

  useEffect(() => {
    const lastMessageId = messages.at(-1)?.id;

    if (lastMessageId) {
      const timer = setInterval(() => {
        getNewMessage()
        setDelayLoad(true)
        setTimeout(() => setDelayLoad(false), 1000)
      }, 5000);

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
          setTimeout(() => {
            getOldMessage()
          }, 500);
        }
      } else if ("DESC") {
        const scrollTop = 0;
        if (scrollY <= scrollTop) {
          setTimeout(() => {
            getOldMessage()
          }, 500);
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
    if (loading == LoadingStatus.pending || delayLoad) {
      return (
        <CircularProgress />
      )
    }
  }, [loading, delayLoad])

  return (
    <div className='container'>
      <div className={scss.messages__wrapper}>
        <div className={scss.loader__container}>{renderLoader}</div>
        {renderMessages}
      </div>
    </div>
  )
};

export default CardsBlock;
