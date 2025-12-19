import { useState, useCallback } from 'react';
import { WIDGET_TYPES } from '../config';

/**
 * Hook for managing drag and drop state and handlers
 * @param {Object} layout - Current layout state
 * @param {Function} setLayout - Layout setter function
 * @returns {Object} - Drag and drop state and handlers
 */
export const useDragAndDrop = (layout, setLayout) => {
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [activeDropZone, setActiveDropZone] = useState(null);

  const handleDragStart = useCallback((e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedWidget(null);
    setActiveDropZone(null);
  }, []);

  const handleDropZoneDragOver = useCallback((e, zoneId) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropZone(zoneId);
  }, []);

  const handleDropZoneDragLeave = useCallback((e) => {
    e.preventDefault();
    setActiveDropZone(null);
  }, []);

  const handleDropAtIndex = useCallback((region, index) => {
    if (!draggedWidget) return;

    // Check if widget is allowed in this region
    const widgetType = WIDGET_TYPES[draggedWidget.type];
    if (widgetType && !widgetType.allowedRegions.includes(region)) {
      setDraggedWidget(null);
      setActiveDropZone(null);
      return;
    }

    const newLayout = { ...layout };
    const draggedRegion = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === draggedWidget.id)
    );
    const draggedIndex = draggedRegion
      ? layout[draggedRegion].findIndex(w => w.id === draggedWidget.id)
      : -1;

    // Remove widget from all regions
    Object.keys(newLayout).forEach(r => {
      newLayout[r] = newLayout[r].filter(w => w.id !== draggedWidget.id);
    });

    // Adjust index if moving within same region
    let adjustedIndex = index;
    if (draggedRegion === region && draggedIndex < index) {
      adjustedIndex = index - 1;
    }

    // Insert widget at new position
    newLayout[region].splice(adjustedIndex, 0, draggedWidget);
    setLayout(newLayout);
    setDraggedWidget(null);
    setActiveDropZone(null);
  }, [draggedWidget, layout, setLayout]);

  const handleDrop = useCallback((region, targetWidget = null) => {
    if (!draggedWidget) return;
    if (targetWidget && draggedWidget.id === targetWidget.id) return;

    // Check if widget is allowed in this region
    const widgetType = WIDGET_TYPES[draggedWidget.type];
    if (widgetType && !widgetType.allowedRegions.includes(region)) {
      setDraggedWidget(null);
      setActiveDropZone(null);
      return;
    }

    const newLayout = { ...layout };
    const draggedRegion = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === draggedWidget.id)
    );
    const draggedIndex = draggedRegion
      ? layout[draggedRegion].findIndex(w => w.id === draggedWidget.id)
      : -1;
    const targetIndex = targetWidget
      ? layout[region].findIndex(w => w.id === targetWidget.id)
      : -1;

    // Remove widget from all regions
    Object.keys(newLayout).forEach(r => {
      newLayout[r] = newLayout[r].filter(w => w.id !== draggedWidget.id);
    });

    // Insert at target position or at end
    if (targetWidget && targetIndex !== -1) {
      let insertIndex = targetIndex + 1;
      if (draggedRegion === region && draggedIndex < targetIndex) {
        insertIndex = targetIndex;
      }
      newLayout[region].splice(insertIndex, 0, draggedWidget);
    } else {
      newLayout[region].push(draggedWidget);
    }

    setLayout(newLayout);
    setDraggedWidget(null);
    setActiveDropZone(null);
  }, [draggedWidget, layout, setLayout]);

  return {
    draggedWidget,
    activeDropZone,
    handleDragStart,
    handleDragEnd,
    handleDropZoneDragOver,
    handleDropZoneDragLeave,
    handleDropAtIndex,
    handleDrop,
  };
};
