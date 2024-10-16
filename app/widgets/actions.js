import { updateWidgetContext } from '../components/grid/helperFunctions';

export const handleSelectWidgetContext = (widgetProps, context) => {
  widgetProps.setSelectedWidgetContext(context);
  updateWidgetContext(widgetProps, context);
  return;
};

export const handleSetItemInFocus = (
  inFocusSetter,
  item,
  setLatestItemInFocus
) => {
  inFocusSetter(item);
  setLatestItemInFocus(item);
};

export const handleSearchTermChange = (
  e,
  setSearchTerm,
  setActiveSearchTerm
) => {
  e.preventDefault();
  console.log(e.target.value);

  setSearchTerm(e.target.value);
  setActiveSearchTerm(e.target.value);
};
export const handleOpenNewItem = async (setShowNewItem, collection) => {
  console.log(collection);
  // setSelectedWidgetContext('newItem');
  setShowNewItem(true);
};
export const handleCloseNewItem = (setShowNewItem, collection) => {
  console.log(collection);

  setShowNewItem(false);
};
