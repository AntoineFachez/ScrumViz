export const notify = (note, state) => {
  toast[state](note, {
    position: 'bottom-center',
  });
};
