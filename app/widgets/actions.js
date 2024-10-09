import { updateWidgetContext } from '../components/grid/helperFunctions';

export const handleSelectWidgetContext = (
  widget,
  widgetProps,
  setSelectedWidgetContext,
  context
) => {
  setSelectedWidgetContext(context);
  updateWidgetContext(widget, widgetProps, context);
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

  setSearchTerm(e.target.value);
  setActiveSearchTerm(e.target.value);
};
