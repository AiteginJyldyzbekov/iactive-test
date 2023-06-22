import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useSelectorMessages } from '../../store/selectors';
import useMessages from '../../helpers/hooks/useMessage';
import BlockCardContainer from './blockCard/BlockCardContainer';
import CardsBlockUi from './CardsBlockUi';

const CardsBlockContainer: React.FC = () => {
  const { messages, loading, ascending } = useSelectorMessages();
  const { getFirstMessages, getOldMessages, getNewMessages } = useMessages(messages);
  const [delayLoad, setDelayLoad] = useState(false);

  useEffect(() => {
    getFirstMessages();
  }, []);

  useEffect(() => {
    const lastMessageId = messages.at(-1)?.id;

    if (lastMessageId) {
      const timer = setInterval(() => {
        getNewMessages();
        setDelayLoad(true);
        setTimeout(() => setDelayLoad(false), 1000);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (ascending === 'ASC') {
        if (scrollY + windowHeight >= documentHeight) {
          setTimeout(() => {
            getOldMessages();
          }, 500);
        }
      } else if (ascending === 'DESC') {
        const scrollTop = 0;
        if (scrollY <= scrollTop) {
          setTimeout(() => {
            getOldMessages();
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ascending]);

  const renderMessages = useMemo(() => {
    return messages.map((message, index) => (
      <BlockCardContainer key={`${message.author}_${index}`} {...message} />
    ));
  }, [messages]);

  return (
    <CardsBlockUi
      renderMessages={renderMessages}
      loading={loading}
      delayLoad={delayLoad}
    />
  );
};

export default CardsBlockContainer;