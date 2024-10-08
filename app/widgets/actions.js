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
  latestSelectedItemSetter
) => {
  inFocusSetter(item);
  latestSelectedItemSetter(item);
};
