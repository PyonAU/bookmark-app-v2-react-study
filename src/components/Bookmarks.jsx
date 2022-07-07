/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import './Bookmarks.css';

function Bookmarks({ inputs, onDelete }) {

  const mappedData = inputs.map((card, i) => {

    return (
      <div className="container" id="bookmarks-container" key={i}>
        <div className="item">
          <i className="fas fa-times" title="Delete Bookmark" onClick={() => onDelete(card.url)}></i>
          <div className="name">
            <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${card.url}`} alt="Favicon" />
            <a href={card.url} target="_blank" rel="noreferrer">{card.name}</a>
          </div>
        </div>
      </div>
    )
  });

  return (
    mappedData
  );
}

export default Bookmarks;