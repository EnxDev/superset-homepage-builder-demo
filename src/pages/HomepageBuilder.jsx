/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import {
  Layout,
  Menu,
  Button,
  Modal,
  Switch,
  Tag,
  Typography,
  Space,
  Input,
  ConfigProvider,
  theme,
  Alert,
  Flex,
  Select,
  Popconfirm,
  message
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  ReloadOutlined,
  DownOutlined,
  SunOutlined,
  MoonOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';

// Config
import { getDarkTheme, getLightTheme, WIDGET_TYPES } from '../config';

// Constants
import { INITIAL_LAYOUT, DEFAULT_HOMEPAGES, STORAGE_KEYS } from '../constants';

// Context
import { DarkModeContext } from '../context';

// Hooks
import { useDragAndDrop } from '../hooks';

// Components
import { DropZone, WidgetWrapper, WidgetPicker, WidgetRenderer, ConfigModalContent } from '../components';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const { useToken } = theme;

// Load saved data from localStorage
const loadFromStorage = () => {
  try {
    const savedLayout = localStorage.getItem(STORAGE_KEYS.layout);
    const savedPrefs = localStorage.getItem(STORAGE_KEYS.preferences);
    const savedHomepages = localStorage.getItem(STORAGE_KEYS.savedHomepages);

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
 * Main Homepage Builder Component
 */
export default function HomepageBuilder() {
  const stored = loadFromStorage();

  // Layout state
  const [layout, setLayout] = useState(stored.layout || INITIAL_LAYOUT);
  const [isEditing, setIsEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerRegion, setPickerRegion] = useState('main');
  const [configWidget, setConfigWidget] = useState(null);
  const [savedLayout, setSavedLayout] = useState(null);

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

  // Drag and drop hook
  const {
    draggedWidget,
    activeDropZone,
    handleDragStart,
    handleDragEnd,
    handleDropZoneDragOver,
    handleDropZoneDragLeave,
    handleDropAtIndex,
    handleDrop,
  } = useDragAndDrop(layout, setLayout);

  const currentTheme = isDarkMode ? getDarkTheme() : getLightTheme();

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
  const handleAddWidget = (widgetType, region) => {
    const widgetDef = WIDGET_TYPES[widgetType];
    const newWidget = {
      id: `${region}-${Date.now()}`,
      type: widgetType,
      width: 12,
      config: { ...widgetDef.defaultConfig },
      collapsed: false
    };

    setLayout({
      ...layout,
      [region]: [...layout[region], newWidget]
    });
    setShowPicker(false);
  };

  const handleRemoveWidget = (region, widgetId) => {
    setLayout({
      ...layout,
      [region]: layout[region].filter(w => w.id !== widgetId)
    });
  };

  const handleToggleCollapse = (widgetId) => {
    const region = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === widgetId)
    );

    if (region) {
      setLayout({
        ...layout,
        [region]: layout[region].map(w =>
          w.id === widgetId ? { ...w, collapsed: !w.collapsed } : w
        )
      });
    }
  };

  const handleConfigSave = (updatedWidget) => {
    const region = Object.keys(layout).find(r =>
      layout[r].some(w => w.id === updatedWidget.id)
    );

    if (region) {
      setLayout({
        ...layout,
        [region]: layout[region].map(w =>
          w.id === updatedWidget.id ? updatedWidget : w
        )
      });
    }
    setConfigWidget(null);
  };

  // Edit mode handlers
  const handleSave = () => {
    setSavedLayout(JSON.parse(JSON.stringify(layout)));
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (savedLayout) {
      setLayout(JSON.parse(JSON.stringify(savedLayout)));
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    const selectedHomepage = savedHomepages.find(h => h.id === selectedHomepageId);
    if (selectedHomepage) {
      setLayout(JSON.parse(JSON.stringify(selectedHomepage.layout)));
    } else {
      setLayout(JSON.parse(JSON.stringify(INITIAL_LAYOUT)));
    }
  };

  const handleClear = () => {
    setLayout({ header: [], main: [], sidebar: [] });
  };

  const handleNewHomepage = () => {
    const emptyLayout = { header: [], main: [], sidebar: [] };
    setLayout(emptyLayout);
    setSelectedHomepageId(null);
    setIsEditing(true);
    setSavedLayout(JSON.parse(JSON.stringify(emptyLayout)));
  };

  // Saved homepages handlers
  const handleSaveAsHomepage = () => {
    if (!newHomepageName.trim()) {
      message.warning('Please enter a name for the homepage');
      return;
    }
    const newHomepage = {
      id: `homepage-${Date.now()}`,
      name: newHomepageName.trim(),
      layout: JSON.parse(JSON.stringify(layout)),
      createdAt: new Date().toISOString()
    };
    const updatedHomepages = [...savedHomepages, newHomepage];
    setSavedHomepages(updatedHomepages);
    localStorage.setItem(STORAGE_KEYS.savedHomepages, JSON.stringify(updatedHomepages));
    setSelectedHomepageId(newHomepage.id);
    setNewHomepageName('');
    setShowSaveModal(false);
    message.success(`Homepage "${newHomepage.name}" saved!`);
  };

  const handleLoadHomepage = (homepageId) => {
    const homepage = savedHomepages.find(h => h.id === homepageId);
    if (homepage) {
      setLayout(JSON.parse(JSON.stringify(homepage.layout)));
      setSelectedHomepageId(homepageId);
      message.success(`Loaded "${homepage.name}"`);
    }
  };

  const handleDeleteHomepage = (homepageId) => {
    const homepage = savedHomepages.find(h => h.id === homepageId);
    const updatedHomepages = savedHomepages.filter(h => h.id !== homepageId);
    setSavedHomepages(updatedHomepages);
    localStorage.setItem(STORAGE_KEYS.savedHomepages, JSON.stringify(updatedHomepages));
    if (selectedHomepageId === homepageId) {
      setSelectedHomepageId(null);
    }
    message.success(`Homepage "${homepage?.name}" deleted`);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ConfigProvider theme={currentTheme} key={isDarkMode ? 'dark' : 'light'}>
        <HomepageBuilderContent
          layout={layout}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          pickerRegion={pickerRegion}
          setPickerRegion={setPickerRegion}
          configWidget={configWidget}
          setConfigWidget={setConfigWidget}
          draggedWidget={draggedWidget}
          savedLayout={savedLayout}
          setSavedLayout={setSavedLayout}
          showThumbnails={showThumbnails}
          setShowThumbnails={setShowThumbnails}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeDropZone={activeDropZone}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDropZoneDragOver={handleDropZoneDragOver}
          handleDropZoneDragLeave={handleDropZoneDragLeave}
          handleDropAtIndex={handleDropAtIndex}
          handleDrop={handleDrop}
          handleAddWidget={handleAddWidget}
          handleRemoveWidget={handleRemoveWidget}
          handleToggleCollapse={handleToggleCollapse}
          handleConfigSave={handleConfigSave}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleReset={handleReset}
          handleClear={handleClear}
          handleNewHomepage={handleNewHomepage}
          savedHomepages={savedHomepages}
          selectedHomepageId={selectedHomepageId}
          showSaveModal={showSaveModal}
          setShowSaveModal={setShowSaveModal}
          newHomepageName={newHomepageName}
          setNewHomepageName={setNewHomepageName}
          handleSaveAsHomepage={handleSaveAsHomepage}
          handleLoadHomepage={handleLoadHomepage}
          handleDeleteHomepage={handleDeleteHomepage}
        />
      </ConfigProvider>
    </DarkModeContext.Provider>
  );
}

/**
 * Separated content component to use token inside ConfigProvider
 */
function HomepageBuilderContent({
  layout, isEditing, setIsEditing, showPicker, setShowPicker,
  pickerRegion, setPickerRegion, configWidget, setConfigWidget,
  draggedWidget, savedLayout, setSavedLayout, showThumbnails, setShowThumbnails,
  isDarkMode, setIsDarkMode, activeDropZone, sidebarCollapsed, setSidebarCollapsed,
  sidebarWidth, setSidebarWidth,
  handleDragStart, handleDragEnd, handleDropZoneDragOver, handleDropZoneDragLeave,
  handleDropAtIndex, handleDrop, handleAddWidget, handleRemoveWidget,
  handleToggleCollapse, handleConfigSave, handleSave, handleCancel, handleReset, handleClear,
  handleNewHomepage, savedHomepages, selectedHomepageId, showSaveModal, setShowSaveModal,
  newHomepageName, setNewHomepageName, handleSaveAsHomepage, handleLoadHomepage,
  handleDeleteHomepage
}) {
  const { token } = useToken();

  return (
    <Layout css={css`min-height: 100vh; background: ${token.colorBgLayout};`}>
      {/* Top Navigation Bar */}
      <Header
        css={css`
          padding: 0 ${token.paddingMD}px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${token.colorBorder};
          height: 48px;
          line-height: 48px;
          background: ${token.colorBgContainer};
        `}
      >
        <Space size={24} align="center">
          <img
            src="/superset-logo-horiz.png"
            alt="Superset"
            css={css`height: 24px; display: block;`}
          />
          <Menu
            mode="horizontal"
            theme={isDarkMode ? 'dark' : 'light'}
            css={css`background: transparent; border-bottom: none;`}
            items={[
              { key: 'dashboards', label: 'Dashboards' },
              { key: 'charts', label: 'Charts' },
              { key: 'datasets', label: 'Datasets' },
              { key: 'sql', label: <span>SQL <DownOutlined css={css`font-size: 10px;`} /></span> },
            ]}
          />
        </Space>

        <Space>
          <Tag color="error" css={css`margin: 0;`}>flask-debug</Tag>
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined css={css`color: ${token.colorWarning};`} /> : <MoonOutlined css={css`color: ${token.colorPrimary};`} />}
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          />
          <Button type="text" icon={<PlusOutlined css={css`color: ${token.colorTextSecondary};`} />} />
          <Button type="text" icon={<SearchOutlined css={css`color: ${token.colorTextSecondary};`} />} />
          <Button type="text" css={css`color: ${token.colorTextSecondary};`}>
            Settings <DownOutlined css={css`font-size: 10px;`} />
          </Button>
        </Space>
      </Header>

      {/* Page Header */}
      <Flex
        justify="space-between"
        align="center"
        css={css`
          padding: ${token.paddingMD}px ${token.paddingLG}px;
          border-bottom: 1px solid ${token.colorBorder};
          background: ${token.colorBgContainer};
        `}
      >
        <Space align="center">
          <h1 css={css`margin: 0; color: ${token.colorText}; font-size: 18px; font-weight: ${token.fontWeightStrong};`}>
            Home
          </h1>
          {savedHomepages.length > 0 && (
            <Select
              size="small"
              placeholder="Load homepage..."
              value={selectedHomepageId}
              onChange={handleLoadHomepage}
              style={{ width: 180 }}
              allowClear
              onClear={() => {}}
              options={savedHomepages.map(h => ({
                value: h.id,
                label: (
                  <Space css={css`width: 100%; justify-content: space-between;`}>
                    <span><FolderOutlined css={css`margin-right: 6px;`} />{h.name}</span>
                  </Space>
                )
              }))}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div css={css`padding: 8px; border-top: 1px solid ${token.colorBorder};`}>
                    <Popconfirm
                      title="Delete all saved homepages?"
                      onConfirm={() => {
                        savedHomepages.forEach(h => handleDeleteHomepage(h.id));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="small" type="text" danger icon={<DeleteOutlined />} css={css`width: 100%;`}>
                        Delete All
                      </Button>
                    </Popconfirm>
                  </div>
                </>
              )}
            />
          )}
          <Button
            size="small"
            type="text"
            icon={<PlusOutlined />}
            onClick={handleNewHomepage}
            title="Create new empty homepage"
            css={css`color: ${token.colorPrimary}; &:hover { color: ${token.colorPrimary}; background: rgba(32, 167, 201, 0.1); }`}
          />
          <Button
            size="small"
            icon={<FolderOpenOutlined />}
            onClick={() => setShowSaveModal(true)}
            css={css`font-size: 11px;`}
          >
            Save As
          </Button>
        </Space>
        <Space size={token.marginMD}>
          <Space>
            <Switch
              size="small"
              checked={showThumbnails}
              onChange={setShowThumbnails}
            />
            <span css={css`color: ${token.colorPrimary}; font-size: 12px;`}>Thumbnails</span>
          </Space>

          {isEditing ? (
            <Space size="small">
              <Button size="small" type="default" icon={<DeleteOutlined />} onClick={handleClear} css={css`border-color: #ef4444 !important; color: #ef4444 !important; font-size: 11px; &:hover { border-color: #f87171 !important; color: #f87171 !important; background: rgba(239, 68, 68, 0.1) !important; }`}>Clear</Button>
              <Button size="small" type="default" icon={<ReloadOutlined />} onClick={handleReset} css={css`border-color: #fa8c16 !important; color: #fa8c16 !important; font-size: 11px; &:hover { border-color: #ffa940 !important; color: #ffa940 !important; background: rgba(250, 140, 22, 0.1) !important; }`}>Reset</Button>
              <Button size="small" type="default" onClick={handleCancel} css={css`fontSize: '11px', background: 'rgba(32, 167, 201, 0.1)', borderColor: 'rgba(32, 167, 201, 0.3)'`}>Cancel</Button>
              <Button size="small" type="primary" icon={<SaveOutlined />} onClick={handleSave} css={css`fontSize: '11px'`}>Save</Button>
            </Space>
          ) : (
            <Button size="small" icon={<EditOutlined />} onClick={() => { setSavedLayout(JSON.parse(JSON.stringify(layout))); setIsEditing(true); }} style={{ fontSize: '12px' }}>
              Edit Homepage
            </Button>
          )}

          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
          />
        </Space>
      </Flex>

      {/* Main Content Area with Sidebar */}
      <Layout css={css`background: ${token.colorBgLayout};`}>
        {/* Main Content */}
        <Content css={css`padding: ${token.paddingLG}px; background: ${token.colorBgLayout};`}>
          {/* Edit Mode Banner */}
          {isEditing && (
            <Alert
              message={
                <Space>
                  <EditOutlined css={css`color: ${token.colorPrimary};`} />
                  <Text css={css`color: ${token.colorText};`}>
                    <strong>Edit Mode:</strong> Drag sections to reorder, click settings to configure, or add new widgets.
                  </Text>
                </Space>
              }
              type="info"
              css={css`
                margin-bottom: ${token.marginMD}px;
                background: rgba(32, 167, 201, 0.1);
                border: 1px solid rgba(32, 167, 201, 0.3);
              `}
              action={
                <Button size="small" icon={<PlusOutlined />} onClick={() => { setPickerRegion('main'); setShowPicker(true); }} style={{ fontSize: '12px' }}>
                  Add Widget
                </Button>
              }
            />
          )}

          {/* Main Region */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('main')}
            onDragEnd={handleDragEnd}
          >
            {/* First drop zone */}
            {isEditing && layout.main.length > 0 && (
              <DropZone
                isEditing={isEditing}
                isActive={activeDropZone === 'main-0'}
                onDragOver={(e) => handleDropZoneDragOver(e, 'main-0')}
                onDragLeave={handleDropZoneDragLeave}
                onDrop={() => handleDropAtIndex('main', 0)}
              />
            )}

            {layout.main.map((widget, index) => (
              <div key={widget.id}>
                <WidgetWrapper
                  widget={widget}
                  isEditing={isEditing}
                  onRemove={(id) => handleRemoveWidget('main', id)}
                  onConfigure={setConfigWidget}
                  onToggleCollapse={handleToggleCollapse}
                  onDragStart={handleDragStart}
                  isDragging={draggedWidget?.id === widget.id}
                >
                  <WidgetRenderer
                    widget={widget}
                    isEditing={isEditing}
                    onConfigure={setConfigWidget}
                  />
                </WidgetWrapper>
                {isEditing && (
                  <DropZone
                    isEditing={isEditing}
                    isActive={activeDropZone === `main-${index + 1}`}
                    onDragOver={(e) => handleDropZoneDragOver(e, `main-${index + 1}`)}
                    onDragLeave={handleDropZoneDragLeave}
                    onDrop={() => handleDropAtIndex('main', index + 1)}
                  />
                )}
              </div>
            ))}

            {isEditing && layout.main.length === 0 && (
              <div
                css={css`
                  border: 2px dashed ${activeDropZone === 'main-empty' ? token.colorPrimary : token.colorBorder};
                  border-radius: ${token.borderRadiusLG}px;
                  padding: 48px;
                  text-align: center;
                  background: ${activeDropZone === 'main-empty' ? 'rgba(32, 167, 201, 0.15)' : token.colorBgElevated};
                  transition: all ${token.motionDurationMid};
                `}
                onDragOver={(e) => handleDropZoneDragOver(e, 'main-empty')}
                onDragLeave={handleDropZoneDragLeave}
                onDrop={(e) => { e.preventDefault(); handleDrop('main'); }}
              >
                <PlusOutlined css={css`font-size: 24px; color: ${activeDropZone === 'main-empty' ? token.colorPrimary : token.colorTextTertiary};`} />
                <div css={css`margin-top: ${token.marginSM}px;`}>
                  <span css={css`color: ${token.colorTextSecondary};`}>Drop widget here or click </span>
                  <span css={css`color: ${token.colorPrimary};`}>Add Widget</span>
                </div>
              </div>
            )}
          </div>
        </Content>

        {/* Right Sidebar */}
        <Sider
          width={sidebarWidth}
          collapsedWidth={0}
          collapsed={sidebarCollapsed}
          css={css`
            background: ${token.colorBgContainer};
            border-left: 1px solid ${token.colorBorder};
            position: relative;
          `}
          trigger={null}
        >
          {/* Resize Handle */}
          <div
            css={css`
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              width: 8px;
              cursor: ew-resize;
              background: transparent;
              transition: background ${token.motionDurationMid};
              z-index: 10;
              display: flex;
              align-items: flex-start;
              justify-content: center;
              padding-top: 300px;
              &:hover {
                background: rgba(32, 167, 201, 0.15);
              }
              &::before {
                content: '';
                width: 4px;
                height: 40px;
                background: ${token.colorTextSecondary};
                border-radius: 2px;
                opacity: 0.8;
                transition: opacity ${token.motionDurationMid}, background ${token.motionDurationMid};
              }
              &:hover::before {
                background: ${token.colorPrimary};
                opacity: 1;
              }
            `}
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = sidebarWidth;

              const onMouseMove = (moveEvent) => {
                const delta = startX - moveEvent.clientX;
                const newWidth = Math.min(Math.max(startWidth + delta, 200), 500);
                setSidebarWidth(newWidth);
              };

              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          />

          {/* Sidebar Content */}
          <div css={css`padding: ${token.paddingMD}px;`}>
            <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
              <Text strong css={css`color: ${token.colorText}; font-size: ${token.fontSizeLG}px;`}>
                Sidebar
              </Text>
              {isEditing && (
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => { setPickerRegion('sidebar'); setShowPicker(true); }}
                >
                  Add
                </Button>
              )}
            </Flex>

            {/* Sidebar Widgets */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('sidebar')}
              onDragEnd={handleDragEnd}
            >
              {isEditing && layout.sidebar.length > 0 && (
                <DropZone
                  isEditing={isEditing}
                  isActive={activeDropZone === 'sidebar-0'}
                  onDragOver={(e) => handleDropZoneDragOver(e, 'sidebar-0')}
                  onDragLeave={handleDropZoneDragLeave}
                  onDrop={() => handleDropAtIndex('sidebar', 0)}
                />
              )}

              {layout.sidebar.map((widget, index) => (
                <div key={widget.id}>
                  <WidgetWrapper
                    widget={widget}
                    isEditing={isEditing}
                    onRemove={(id) => handleRemoveWidget('sidebar', id)}
                    onConfigure={setConfigWidget}
                    onToggleCollapse={handleToggleCollapse}
                    onDragStart={handleDragStart}
                    isDragging={draggedWidget?.id === widget.id}
                  >
                    <WidgetRenderer
                      widget={widget}
                      isEditing={isEditing}
                      onConfigure={setConfigWidget}
                    />
                  </WidgetWrapper>
                  {isEditing && (
                    <DropZone
                      isEditing={isEditing}
                      isActive={activeDropZone === `sidebar-${index + 1}`}
                      onDragOver={(e) => handleDropZoneDragOver(e, `sidebar-${index + 1}`)}
                      onDragLeave={handleDropZoneDragLeave}
                      onDrop={() => handleDropAtIndex('sidebar', index + 1)}
                    />
                  )}
                </div>
              ))}

              {layout.sidebar.length === 0 && (
                <div
                  css={css`
                    border: 2px dashed ${activeDropZone === 'sidebar-empty' ? token.colorPrimary : token.colorBorder};
                    border-radius: ${token.borderRadiusLG}px;
                    padding: ${token.paddingLG}px;
                    text-align: center;
                    background: ${activeDropZone === 'sidebar-empty' ? 'rgba(32, 167, 201, 0.15)' : 'transparent'};
                    transition: all ${token.motionDurationMid};
                  `}
                  onDragOver={(e) => handleDropZoneDragOver(e, 'sidebar-empty')}
                  onDragLeave={handleDropZoneDragLeave}
                  onDrop={(e) => { e.preventDefault(); handleDrop('sidebar'); }}
                >
                  <Text type="secondary" css={css`font-size: ${token.fontSizeSM}px;`}>
                    {isEditing ? 'Drop widgets here' : 'No sidebar widgets'}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Sider>
      </Layout>

      {/* Widget Picker Modal */}
      <Modal
        title={<div css={css`text-align: center; font-weight: 600;`}>Add Widget to {pickerRegion === 'main' ? 'Main Area' : pickerRegion === 'sidebar' ? 'Sidebar' : 'Header'}</div>}
        open={showPicker}
        onCancel={() => setShowPicker(false)}
        footer={null}
        width={800}
      >
        <WidgetPicker
          onAddWidget={(type) => handleAddWidget(type, pickerRegion)}
          currentRegion={pickerRegion}
        />
      </Modal>

      {/* Config Modal */}
      <Modal
        title={`Configure ${WIDGET_TYPES[configWidget?.type]?.name || ''}`}
        open={!!configWidget}
        onCancel={() => setConfigWidget(null)}
        footer={null}
      >
        {configWidget && <ConfigModalContent key={configWidget.id} widget={configWidget} onSave={handleConfigSave} onCancel={() => setConfigWidget(null)} />}
      </Modal>

      {/* Save Homepage Modal */}
      <Modal
        title={<Space><FolderOpenOutlined /> Save Homepage</Space>}
        open={showSaveModal}
        onCancel={() => { setShowSaveModal(false); setNewHomepageName(''); }}
        footer={
          <div css={css`
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: ${token.paddingSM}px 0 0 0;
          `}>
            <Button
              onClick={() => { setShowSaveModal(false); setNewHomepageName(''); }}
              css={css`font-size: 11px;`}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSaveAsHomepage}
              css={css`font-size: 11px;`}
            >
              Save
            </Button>
          </div>
        }
        styles={{ footer: { background: 'transparent', borderTop: 'none' } }}
      >
        <div css={css`margin: ${token.marginMD}px 0;`}>
          <Text css={css`display: block; margin-bottom: ${token.marginXS}px;`}>
            Enter a name for this homepage configuration:
          </Text>
          <Input
            placeholder="e.g., Analytics Dashboard, Sales Overview..."
            value={newHomepageName}
            onChange={(e) => setNewHomepageName(e.target.value)}
            onPressEnter={handleSaveAsHomepage}
            autoFocus
          />
          {savedHomepages.length > 0 && (
            <div css={css`margin-top: ${token.marginMD}px;`}>
              <Text type="secondary" css={css`font-size: 12px;`}>
                Existing homepages: {savedHomepages.map(h => h.name).join(', ')}
              </Text>
            </div>
          )}
        </div>
      </Modal>
    </Layout>
  );
}
