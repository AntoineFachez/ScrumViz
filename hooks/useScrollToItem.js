import { useRef, useEffect } from 'react';

const useScrollToItem = () => {
  const flexListRef = useRef(null);

  const scrollToItem = (itemId) => {
    if (flexListRef.current && itemId) {
      const listItemRef = flexListRef.current.querySelector(
        `[data-slug="${itemId}"]`
      );
      if (listItemRef) {
        listItemRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  };

  useEffect(() => {
    // This effect can be used to scroll to an item on initial render
    // if needed, by calling scrollToItem with the desired itemId.
  }, []);

  return { flexListRef, scrollToItem };
};

export default useScrollToItem;
