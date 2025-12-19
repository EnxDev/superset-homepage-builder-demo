import { useState, useCallback, useEffect } from 'react';
import { WIDGET_TYPES } from '../config';
import { INITIAL_LAYOUT, DEFAULT_HOMEPAGES, STORAGE_KEYS } from '../constants';

/**
 * Load saved data from localStorage
 */
const loadFromStorage = () => {
  try {
    const savedLayout = localStorage.getItem(STORAGE_KEYS.layout);
    const savedPrefs = localStorage.getItem(STORAGE_KEYS.preferences);
    const savedHomepages = localStorage.getItem(STORAGE_KEYS.savedHomepages);

    // Use saved homepages if available and not empty, otherwise use default presets
    let homepages = DEFAULT_HOMEPAGES;
    if (savedHomepages) {
      const parsed = JSON.parse(savedHomepages);
      if (Array.isArray(parsed) && parsed.length > 0) {
        homepages = parsed;
      }
    }

    return {
      layout: savedLayout ? JSON.parse(savedLayout) : null,
      preferences: savedPrefs ? JSON.parse(savedPrefs) : null,
      savedHomepages: homepages
    };
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return { layout: null, preferences: null, savedHomepages: DEFAULT_HOMEPAGES };
  }
};

/**
 * Hook for managing homepage builder state
 * @returns {Object} - Homepage state and handlers
 */
export const useHomepageState = () => {
  const stored = loadFromStorage();

  // Layout state
  const [layout, setLayout] = useState(stored.layout || INITIAL_LAYOUT);
  const [savedLayout, setSavedLayout] = useState(null);

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerRegion, setPickerRegion] = useState('main');
  const [configWidget, setConfigWidget] = useState(null);

  // Preferences
  const [showThumbnails, setShowThumbnails] = useState(stored.preferences?.showThumbnails ?? true);
  const [isDarkMode, setIsDarkMode] = useState(stored.preferences?.isDarkMode ?? true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(stored.preferences?.sidebarCollapsed ?? false);
  const [sidebarWidth, setSidebarWidth] = useState(stored.preferences?.sidebarWidth ?? 400);

  // Saved homepages
  const [savedHomepages, setSavedHomepages] = useState(stored.savedHomepages || []);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newHomepageName, setNewHomepageName] = useState('');
  const [selectedHomepageId, setSelectedHomepageId] = useState('preset-default');

  // Save preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify({
        showThumbnails,
        isDarkMode,
        sidebarCollapsed,
        sidebarWidth
      }));
    } catch (e) {
      console.error('Error saving preferences:', e);
    }
  }, [showThumbnails, isDarkMode, sidebarCollapsed, sidebarWidth]);

  // Widget handlers
  const handleAddWidget = useCallback((widgetType, region) => {
    const widgetDef = WIDGET_TYPES[widgetType];
    const newWidget = {
      id: `${region}-${Date.now()}`,
      type: widgetType,
      width: 12,
      config: { ...widgetDef.defaultConfig },
      collapsed: false
    };

    setLayout(prev => ({
      ...prev,
      [region]: [...prev[region], newWidget]
    }));
    setShowPicker(false);
  }, []);

  const handleRemoveWidget = useCallback((region, widgetId) => {
    setLayout(prev => ({
      ...prev,
      [region]: prev[region].filter(w => w.id !== widgetId)
    }));
  }, []);

  const handleToggleCollapse = useCallback((widgetId) => {
    const region = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === widgetId)
    );

    if (region) {
      setLayout(prev => ({
        ...prev,
        [region]: prev[region].map(w =>
          w.id === widgetId ? { ...w, collapsed: !w.collapsed } : w
        )
      }));
    }
  }, [layout]);

  const handleConfigSave = useCallback((updatedWidget) => {
    const region = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === updatedWidget.id)
    );

    if (region) {
      setLayout(prev => ({
        ...prev,
        [region]: prev[region].map(w =>
          w.id === updatedWidget.id ? updatedWidget : w
        )
      }));
    }
    setConfigWidget(null);
  }, [layout]);

  // Edit mode handlers
  const handleStartEditing = useCallback(() => {
    setSavedLayout(JSON.parse(JSON.stringify(layout)));
    setIsEditing(true);
  }, [layout]);

  const handleSaveLayout = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.layout, JSON.stringify(layout));
    } catch (e) {
      console.error('Error saving layout:', e);
    }
    setSavedLayout(null);
    setIsEditing(false);
  }, [layout]);

  const handleCancelEditing = useCallback(() => {
    if (savedLayout) {
      setLayout(savedLayout);
    }
    setSavedLayout(null);
    setIsEditing(false);
  }, [savedLayout]);

  const handleResetLayout = useCallback(() => {
    setLayout(INITIAL_LAYOUT);
    try {
      localStorage.removeItem(STORAGE_KEYS.layout);
    } catch (e) {
      console.error('Error resetting layout:', e);
    }
  }, []);

  // Homepage management handlers
  const handleSaveHomepage = useCallback((name) => {
    const newHomepage = {
      id: `custom-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      layout: JSON.parse(JSON.stringify(layout))
    };

    const updatedHomepages = [...savedHomepages, newHomepage];
    setSavedHomepages(updatedHomepages);
    setSelectedHomepageId(newHomepage.id);

    try {
      localStorage.setItem(STORAGE_KEYS.savedHomepages, JSON.stringify(updatedHomepages));
    } catch (e) {
      console.error('Error saving homepage:', e);
    }

    setShowSaveModal(false);
    setNewHomepageName('');
  }, [layout, savedHomepages]);

  const handleLoadHomepage = useCallback((homepageId) => {
    const homepage = savedHomepages.find(h => h.id === homepageId);
    if (homepage) {
      setLayout(JSON.parse(JSON.stringify(homepage.layout)));
      setSelectedHomepageId(homepageId);
    }
  }, [savedHomepages]);

  const handleDeleteHomepage = useCallback((homepageId) => {
    // Don't allow deleting preset homepages
    if (homepageId.startsWith('preset-')) return;

    const updatedHomepages = savedHomepages.filter(h => h.id !== homepageId);
    setSavedHomepages(updatedHomepages);

    if (selectedHomepageId === homepageId) {
      setSelectedHomepageId('preset-default');
      const defaultHomepage = updatedHomepages.find(h => h.id === 'preset-default');
      if (defaultHomepage) {
        setLayout(JSON.parse(JSON.stringify(defaultHomepage.layout)));
      }
    }

    try {
      localStorage.setItem(STORAGE_KEYS.savedHomepages, JSON.stringify(updatedHomepages));
    } catch (e) {
      console.error('Error deleting homepage:', e);
    }
  }, [savedHomepages, selectedHomepageId]);

  // Picker handlers
  const openPicker = useCallback((region) => {
    setPickerRegion(region);
    setShowPicker(true);
  }, []);

  const closePicker = useCallback(() => {
    setShowPicker(false);
  }, []);

  return {
    // Layout
    layout,
    setLayout,
    savedLayout,

    // UI state
    isEditing,
    showPicker,
    pickerRegion,
    configWidget,
    setConfigWidget,

    // Preferences
    showThumbnails,
    setShowThumbnails,
    isDarkMode,
    setIsDarkMode,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarWidth,
    setSidebarWidth,

    // Saved homepages
    savedHomepages,
    showSaveModal,
    setShowSaveModal,
    newHomepageName,
    setNewHomepageName,
    selectedHomepageId,

    // Widget handlers
    handleAddWidget,
    handleRemoveWidget,
    handleToggleCollapse,
    handleConfigSave,

    // Edit mode handlers
    handleStartEditing,
    handleSaveLayout,
    handleCancelEditing,
    handleResetLayout,

    // Homepage management
    handleSaveHomepage,
    handleLoadHomepage,
    handleDeleteHomepage,

    // Picker handlers
    openPicker,
    closePicker,
  };
};
