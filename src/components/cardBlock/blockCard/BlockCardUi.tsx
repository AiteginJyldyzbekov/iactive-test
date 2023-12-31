import React, { useMemo } from 'react';
import scss from './BlockCard.module.scss';
import Avatar from '../../../assets/images/Avatar.svg';
import starIcon from '../../../assets/images/star.svg';
import { positionBtnsData } from '../../../constants/BlockCard';
import { getMessageTime } from '../../../helpers/time';
import EllipsisText from '../../elipsisText/ElipsisText';
import { BlockCardUiProps } from '../../../types/types';

const BlockCardUi: React.FC<BlockCardUiProps> = React.memo(({
  attachments,
  author,
  channel,
  content,
  date,
  id,
  isLiked,
  onAddToFavorite,
}) => {
  const renderBtns = useMemo(() => {
    return positionBtnsData.map((el, index) => (
      <img key={`${el.alt}_${index}`} src={el.icon} alt={el.alt} />
    ));
  }, []);

  const renderUrl = useMemo(() => {
    if (attachments.length) {
      return attachments.map((item) => {
        if (item.type === 'video') {
          return (
            <video key={item.type} controls>
              <source src={item.url} type="video/mp4" />
            </video>
          );
        }
        return null;
      });
    } else {
      return attachments.map((item) => (
        <img key={item.type} src={item.url} alt="#" />
      ));
    }
  }, [attachments]);

  return (
    <section className={scss.card__wrapper}>
      <header className={scss.card__header}>
        <div className={scss.card__header_info}>
          <img className={scss.card__header__avatar} src={Avatar} alt="user avatar" />
          <div className={scss.text__content}>
            <p className={scss.user__name}>{author}</p>
            <span className={scss.user__text}>{channel}</span>
          </div>
        </div>
        <div className={scss.card__header__buttons}>
          <div className={scss.buttons_position}>
            <button>Левый</button>
            <button>Центр</button>
            <button>Правый</button>
          </div>
          <div className={scss.card__header_actions}>
            {renderBtns}
            <img
              className={`${scss.star} ${isLiked ? scss.active : ''}`}
              src={starIcon}
              alt="star icon"
              onClick={onAddToFavorite}
            />
          </div>
        </div>
      </header>
      <div className={scss.card__content}>
        <p className={scss.card__content__time}>{getMessageTime(date)}</p>
        <div className={scss.card__content__mainContent}>
          <EllipsisText len={247}>{content}</EllipsisText>
          {renderUrl}
        </div>
      </div>
      <footer>
        <span className={`${scss.card__tag} ${scss.active}`}>#Новое</span>
        &nbsp;
        <span className={scss.card__tag}>#Эксперт</span>
      </footer>
    </section>
  );
});

export default BlockCardUi;