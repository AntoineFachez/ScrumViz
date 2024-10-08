import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const notify = (note, state) => {
  toast[state](note, {
    position: 'bottom-center',
  });
};
export const printLetterByLetter = (destination, message, speed) => {
  var i = 0;

  if (i > message.length) {
    var interval = setInterval(function () {
      document.getElementById(destination).innerHTML += message.charAt(i);
      i++;
      clearInterval(interval);
    }, speed);
  }
};
export const createUUID = (amount) => {
  const temp = [];
  for (let i = 0; i < amount; i++) {
    console.log(uuidv4());
  }
};
