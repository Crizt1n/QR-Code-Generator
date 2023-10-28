import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './Qrcode.css';
import TextField from '@mui/material/TextField';
import validator from 'validator';

function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidQRCode, setIsValidQRCode] = useState(true);
  const [errorMessageColor, setErrorMessageColor] = useState('red');

  const validate = (value) => {
    if (validator.isURL(value)) {
      setErrorMessage('URL is Valid');
      setIsValidQRCode(true);
      setErrorMessageColor('green')
    }
    else {
      setErrorMessage('Enter a Valid URL');
      setIsValidQRCode(false);
      setErrorMessageColor('red')
    }
   
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim(); // Trim leading and trailing whitespace
  
    if (inputValue === '') {
      setText(''); // Set the text state to empty when no value entered
      setErrorMessage('');
      setIsValidQRCode(false);
    } else {
      setText(inputValue);
      validate(inputValue);
    }
  };

  return (
    <div className="qrcode-generator">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 p-5 bg-opacity-100 rounded-4 mt-5">
          <h1><b>QR Code Generator</b></h1>
          <TextField className=' w-100 mt-5 bg-light ' id="outlined-textarea" label="Enter the URL" placeholder="eg: www.google.com" multiline
            onChange={handleInputChange} />
          <p className='mt-1 ms-2 text-start' style={{color:errorMessageColor, fontSize:'12px'} }>{errorMessage}</p>
          {isValidQRCode && text && (
            <div className=" bg-light border mt-5 mx-auto rounded-5 p-5 fs-1">
              <p className='fs-5 mb-5'>Here is the QR code for the given URL: <i>{text}</i></p>
              <QRCode value={text} />
            </div>
          )}
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;