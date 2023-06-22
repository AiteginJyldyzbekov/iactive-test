import React, { useState, useEffect, useMemo } from 'react';
import scss from "./BlockCard.module.scss"
import Avatar from '../../../assets/images/Avatar.svg'
import starIcon from "../../../assets/images/star.svg"
import { positionBtns } from '../../../constants/BlockCard';
import { messageType } from '../../../store/types';
import { getMessageTime } from '../../../helpers/time';
import EllipsisText from '../../elipsisText/ElipsisText';

const BlockCard: React.FC<messageType> = ({ attachments,
  author,
  channel,
  content,
  date,
  id, }) => {
  const stars = localStorage.getItem("star") as string;
  const parsedStars = JSON.parse(stars);
  const [isLiked, setIsLiked] = useState<boolean>(Boolean(parsedStars?.[id]));

  useEffect(() => {
    localStorage.setItem(
      "star",
      JSON.stringify({ ...parsedStars, [id]: isLiked })
    );
  }, [isLiked, parsedStars, id]);

  const addToFavorite = () => setIsLiked((prev) => !prev);

  const renderBtns = useMemo(() => {
    return positionBtns.map((el, index) => (
      <img key={`${el.alt}_${index}`} src={el.icon} alt={el.alt} />
    ));
  }, [positionBtns]);

  const renderUrl = useMemo(() => {
    if (attachments.length) {
      return attachments.map((item, index) => {
        if (item.type === "video") {
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
              className={`${scss.star} ${isLiked ? scss.active : ""}`}
              src={starIcon}
              alt="star icon"
              onClick={addToFavorite}
            />
          </div>
        </div>
      </header>
      <div className={scss.card__content}>
        <p className={scss.card__content__time}>
          {getMessageTime(date)}
        </p>
        <div className={scss.card__content__mainContent}>
          <EllipsisText len={247}>{content}</EllipsisText>
          {renderUrl}
        </div>
      </div>
      <footer>
        <span className={`${scss.card__tag} ${scss.active}`}>
          #Новое
        </span>
        &nbsp;
        <span className={scss.card__tag}>#Эксперт</span>
      </footer>
    </section>
  )
};

export default BlockCard;
