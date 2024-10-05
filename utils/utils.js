import { toast } from 'react-toastify';
export const notify = (note, state) => {
  toast[state](note, {
    position: 'bottom-center',
  });
};
