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
