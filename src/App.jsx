import React, { useState, useEffect, useRef } from 'react';
import Bookmarks from './components/Bookmarks';
import './App.css';

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address.');
    return false;
  }
  // Valid
  return true;
}

function App() {

  // State
  const [isAdding, setIsAdding] = useState(false);
  const [inputData, setInputData] = useState([{ name: 'Ayako GitHub', url: 'https://github.com/PyonAU'}]);
  const [inputField, setInputField] = useState({
    name: '',
    url: ''
  });

  // Ref
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdding) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = (userInput) => {
    const nameValue = userInput.name;

    if (!userInput.url.includes('http://') && !userInput.url.includes('https://')) {
      userInput.url = `https://${userInput.url}`;
    }
    if (!validate(nameValue, userInput.url)) {
      return false;
    }
    console.log('userInput:', userInput);
    dispatchInputSet(userInput);
    inputRef.current.focus();
  };

  const dispatchInputSet = (payload) => {
    let oldArray = inputData;
    let newArray = [...oldArray, payload];
    setInputData(newArray);
    setInputField({
      name: '', 
      url: ''
    });
  };

  const deleteBookmark = (url) => {
    console.log('url:', url);
    setInputData(inputData.filter(item => item.url !== url));
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('bookmarks'));
    if (items) {
      setInputData(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(inputData));
  }, [inputData]);

  return (
    <div>
      {/* Open Modal */}
      <h1 id="show-modal" onClick={() => setIsAdding(true)}>Add Bookmark</h1>
      <Bookmarks inputs={inputData} onDelete={deleteBookmark}/>
      {/* Modal */}
      <div className={isAdding ? "modal-container show-modal" : "modal-container"} id="modal">
        <div className="modal">
          <i className="fas fa-times close-icon" id="close-modal" onClick={() => setIsAdding(false)}></i>
          <div className="modal-header">
            <h3>ADD Bookmark</h3>
          </div>
          <div className="modal-content">
            <form id="bookmark-form" onSubmit={(event) => event.preventDefault()}>
              {/* Website Name */}
              <div className="form-group">
                <label htmlFor="website-name" className="form-label">Website Name</label>
                <input 
                type="text" 
                ref={inputRef} 
                onChange={(event) => setInputField({...inputField, name: event.currentTarget.value})} 
                value={inputField.name} 
                className="form-input" 
                minLength="1" 
                maxLength="25" 
                placeholder="max 25 characters" 
                id="website-name" />
              </div>
              {/* Website URL */}
              <div className="form-group">
                <label htmlFor="website-url" className="form-label">Website URL</label>
                <input 
                type="text" 
                onChange={(event) => setInputField({...inputField, url: event.currentTarget.value})}
                value={inputField.url} 
                className="form-input" 
                minLength="7" 
                placeholder="https://example.com/" 
                id="website-url" />
              </div>
              <button type="submit" onClick={() => handleSubmit(inputField)}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
