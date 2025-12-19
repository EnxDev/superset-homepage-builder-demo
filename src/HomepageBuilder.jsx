/** @jsxImportSource @emotion/react */
import { useState, createContext, useContext } from 'react';
import { css } from '@emotion/react';
import {
  Layout,
  Menu,
  Button,
  Card,
  Modal,
  Switch,
  Tag,
  Typography,
  Space,
  Row,
  Col,
  Input,
  InputNumber,
  Checkbox,
  ConfigProvider,
  theme,
  Alert,
  Segmented,
  Flex,
  Select,
  Popconfirm,
  message
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  DownOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  ReloadOutlined,
  StarOutlined,
  MoreOutlined,
  SyncOutlined,
  DatabaseOutlined,
  DashboardOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
  HolderOutlined,
  RightOutlined,
  SunOutlined,
  MoonOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  LineChartOutlined,
  FundOutlined,
  AlertOutlined,
  TableOutlined,
  NotificationOutlined,
  HistoryOutlined,
  TeamOutlined,
  PushpinOutlined,
  TagOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  RobotOutlined,
  MessageOutlined,
  BulbOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  DeleteOutlined,
  FolderOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const { useToken } = theme;

// Theme context for dark mode state
const DarkModeContext = createContext({ isDarkMode: true, setIsDarkMode: () => {} });
const useDarkMode = () => useContext(DarkModeContext).isDarkMode;

// Superset dark theme token customization
const getDarkTheme = () => ({
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#20A7C9',
    colorBgContainer: '#2D3339',
    colorBgElevated: '#2D3339',
    colorBgLayout: '#1B1F23',
    colorBorder: '#3D444D',
    colorBorderSecondary: '#363D44',
    colorText: '#E8E9EA',
    colorTextSecondary: '#9AA0A6',
    colorTextTertiary: '#6B7280',
    colorFillQuaternary: 'rgba(255, 255, 255, 0.04)',
    colorFillTertiary: 'rgba(255, 255, 255, 0.08)',
    colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 6,
    colorSuccess: '#59B578',
    colorWarning: '#FFA94D',
    colorError: '#EF4444',
  },
  components: {
    Layout: {
      headerBg: '#2D3339',
      bodyBg: '#1B1F23',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: '#363D44',
      darkItemHoverBg: '#363D44',
    },
    Card: {
      colorBgContainer: '#2D3339',
      colorBorderSecondary: '#3D444D',
    },
    Button: {
      defaultBg: 'transparent',
      defaultBorderColor: '#20A7C9',
      defaultColor: '#20A7C9',
    },
    Modal: {
      contentBg: '#2D3339',
      headerBg: '#2D3339',
      footerBg: '#262B31',
    },
    Segmented: {
      itemSelectedBg: '#20A7C9',
      itemSelectedColor: '#fff',
      trackBg: '#262B31',
    }
  }
});

// Superset light theme token customization
const getLightTheme = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#20A7C9',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F7F7F7',
    colorBorder: '#E0E0E0',
    colorBorderSecondary: '#F0F0F0',
    colorText: '#1F1F1F',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
    colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 6,
    colorSuccess: '#59B578',
    colorWarning: '#FFA94D',
    colorError: '#EF4444',
  },
  components: {
    Layout: {
      headerBg: '#FFFFFF',
      bodyBg: '#F7F7F7',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#E6F7FC',
      itemHoverBg: '#F0F0F0',
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      colorBorderSecondary: '#E0E0E0',
    },
    Button: {
      defaultBg: 'transparent',
      defaultBorderColor: '#20A7C9',
      defaultColor: '#20A7C9',
    },
    Modal: {
      contentBg: '#FFFFFF',
      headerBg: '#FFFFFF',
      footerBg: '#F7F7F7',
    },
    Segmented: {
      itemSelectedBg: '#20A7C9',
      itemSelectedColor: '#fff',
      itemColor: '#444444',
      itemBg: 'transparent',
      trackBg: '#E8E8E8',
    }
  }
});

// Widget definitions
const WIDGET_TYPES = {
  // === EXISTING WIDGETS ===
  'welcome-banner': {
    id: 'welcome-banner',
    name: 'Welcome Banner',
    icon: <SmileOutlined />,
    category: 'content',
    defaultConfig: { title: 'Welcome to Superset', subtitle: 'Your data exploration platform' },
    allowedRegions: ['main'],
  },
  'recents': {
    id: 'recents',
    name: 'Recents',
    icon: <ClockCircleOutlined />,
    category: 'data',
    defaultConfig: { limit: 4, filter: 'viewed' },
    allowedRegions: ['main'],
  },
  'dashboards': {
    id: 'dashboards',
    name: 'Dashboards',
    icon: <DashboardOutlined />,
    category: 'data',
    defaultConfig: { limit: 5, filter: 'all', showThumbnails: true },
    allowedRegions: ['main'],
  },
  'charts': {
    id: 'charts',
    name: 'Charts',
    icon: <BarChartOutlined />,
    category: 'data',
    defaultConfig: { limit: 5, filter: 'all', showThumbnails: true },
    allowedRegions: ['main'],
  },
  'saved-queries': {
    id: 'saved-queries',
    name: 'Saved queries',
    icon: <DatabaseOutlined />,
    category: 'data',
    defaultConfig: { limit: 5 },
    allowedRegions: ['main'],
  },
  'markdown': {
    id: 'markdown',
    name: 'Markdown',
    icon: <FileTextOutlined />,
    category: 'content',
    defaultConfig: { content: '## Custom Content\n\nAdd your markdown here.' },
    allowedRegions: ['header', 'main', 'sidebar'],
  },
  'quick-links': {
    id: 'quick-links',
    name: 'Quick Links',
    icon: <LinkOutlined />,
    category: 'navigation',
    defaultConfig: { links: [
      { title: 'Documentation', url: '#', icon: 'file' },
      { title: 'SQL Lab', url: '#', icon: 'database' },
      { title: 'Create Dashboard', url: '#', icon: 'dashboard' }
    ]},
    allowedRegions: ['main', 'sidebar'],
  },

  // === DATA & ANALYTICS WIDGETS ===
  'embedded-chart': {
    id: 'embedded-chart',
    name: 'Embedded Chart',
    icon: <LineChartOutlined />,
    category: 'analytics',
    defaultConfig: { chartId: null, chartName: 'Select a chart', height: 300 },
    allowedRegions: ['main', 'sidebar'],
  },
  'kpi-cards': {
    id: 'kpi-cards',
    name: 'KPI Cards',
    icon: <FundOutlined />,
    category: 'analytics',
    defaultConfig: {
      kpis: [
        { label: 'Total Revenue', value: '$1.2M', change: '+12%', trend: 'up' },
        { label: 'Active Users', value: '8,432', change: '+5%', trend: 'up' },
        { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
        { label: 'Avg. Order Value', value: '$142', change: '+8%', trend: 'up' }
      ]
    },
    allowedRegions: ['main'],
  },
  'data-quality-alerts': {
    id: 'data-quality-alerts',
    name: 'Data Quality Alerts',
    icon: <AlertOutlined />,
    category: 'analytics',
    defaultConfig: { limit: 5 },
    allowedRegions: ['main', 'sidebar'],
  },
  'query-results-preview': {
    id: 'query-results-preview',
    name: 'Query Results Preview',
    icon: <TableOutlined />,
    category: 'analytics',
    defaultConfig: { queryId: null, queryName: 'Select a query', limit: 10 },
    allowedRegions: ['main'],
  },

  // === COMMUNICATION WIDGETS ===
  'announcements': {
    id: 'announcements',
    name: 'Announcements',
    icon: <NotificationOutlined />,
    category: 'communication',
    defaultConfig: { limit: 3 },
    allowedRegions: ['main', 'sidebar'],
  },
  'changelog': {
    id: 'changelog',
    name: 'Changelog',
    icon: <HistoryOutlined />,
    category: 'communication',
    defaultConfig: { limit: 5 },
    allowedRegions: ['main', 'sidebar'],
  },
  'team-activity': {
    id: 'team-activity',
    name: 'Team Activity Feed',
    icon: <TeamOutlined />,
    category: 'communication',
    defaultConfig: { limit: 8 },
    allowedRegions: ['main', 'sidebar'],
  },

  // === NAVIGATION & PRODUCTIVITY WIDGETS ===
  'pinned-dashboards': {
    id: 'pinned-dashboards',
    name: 'Pinned Dashboards',
    icon: <PushpinOutlined />,
    category: 'navigation',
    defaultConfig: { limit: 6 },
    allowedRegions: ['main', 'sidebar'],
  },
  'search-box': {
    id: 'search-box',
    name: 'Search Box',
    icon: <SearchOutlined />,
    category: 'navigation',
    defaultConfig: { placeholder: 'Search dashboards, charts, datasets...' },
    allowedRegions: ['main', 'sidebar'],
  },
  'recent-databases': {
    id: 'recent-databases',
    name: 'Recent Databases',
    icon: <DatabaseOutlined />,
    category: 'navigation',
    defaultConfig: { limit: 5 },
    allowedRegions: ['main', 'sidebar'],
  },

  // === ORGANIZATION WIDGETS ===
  'tag-cloud': {
    id: 'tag-cloud',
    name: 'Tag Cloud',
    icon: <TagOutlined />,
    category: 'organization',
    defaultConfig: { limit: 20 },
    allowedRegions: ['main', 'sidebar'],
  },
  'reports-schedule': {
    id: 'reports-schedule',
    name: 'My Reports Schedule',
    icon: <CalendarOutlined />,
    category: 'organization',
    defaultConfig: { limit: 5 },
    allowedRegions: ['main', 'sidebar'],
  },
  'certifications': {
    id: 'certifications',
    name: 'Certifications',
    icon: <SafetyCertificateOutlined />,
    category: 'organization',
    defaultConfig: { limit: 6, filter: 'all' },
    allowedRegions: ['main', 'sidebar'],
  },

  // === AI-POWERED WIDGETS (Future MCP)
  'ai-suggestions': {
    id: 'ai-suggestions',
    name: 'AI Suggestions',
    icon: <BulbOutlined />,
    category: 'ai',
    defaultConfig: { limit: 4 },
    allowedRegions: ['main', 'sidebar'],
  },
  'natural-language-query': {
    id: 'natural-language-query',
    name: 'Natural Language Query',
    icon: <RobotOutlined />,
    category: 'ai',
    defaultConfig: { placeholder: 'Ask a question about your data...' },
    allowedRegions: ['main'],
  },
};

// Initial layout matching Superset homepage
const INITIAL_LAYOUT = {
  header: [],
  main: [
    { id: 'mw', type: 'welcome-banner', width: 12, config: { title: 'Welcome to Superset', subtitle: 'Your data exploration platform' }, collapsed: false },
    { id: 'm0', type: 'recents', width: 12, config: { limit: 4, filter: 'viewed' }, collapsed: false },
    { id: 'm1', type: 'dashboards', width: 12, config: { limit: 5, filter: 'all', showThumbnails: true }, collapsed: false },
    { id: 'm2', type: 'charts', width: 12, config: { limit: 5, filter: 'all', showThumbnails: true }, collapsed: false },
    { id: 'm3', type: 'saved-queries', width: 12, config: { limit: 5 }, collapsed: false }
  ],
  sidebar: [
    { id: 's0', type: 'quick-links', width: 12, config: { links: [
      { title: 'Documentation', url: '#', icon: 'file' },
      { title: 'SQL Lab', url: '#', icon: 'database' },
      { title: 'Create Dashboard', url: '#', icon: 'dashboard' }
    ]}, collapsed: false },
    { id: 's1', type: 'announcements', width: 12, config: { limit: 2 }, collapsed: false },
    { id: 's2', type: 'team-activity', width: 12, config: { limit: 4 }, collapsed: false },
    { id: 's3', type: 'ai-suggestions', width: 12, config: { limit: 3 }, collapsed: false }
  ]
};

// Predefined homepage configurations
const DEFAULT_HOMEPAGES = [
  {
    id: 'preset-default',
    name: 'Default',
    createdAt: '2024-01-01T00:00:00.000Z',
    layout: INITIAL_LAYOUT
  },
  {
    id: 'preset-analytics',
    name: 'Analytics Focus',
    createdAt: '2024-01-01T00:00:00.000Z',
    layout: {
      header: [],
      main: [
        { id: 'a1', type: 'kpi-cards', width: 12, config: { kpis: [
          { label: 'Total Revenue', value: '$1.2M', change: '+12%', trend: 'up' },
          { label: 'Active Users', value: '8,432', change: '+5%', trend: 'up' },
          { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
          { label: 'Avg. Order Value', value: '$142', change: '+8%', trend: 'up' }
        ]}, collapsed: false },
        { id: 'a2', type: 'recents', width: 12, config: { limit: 4, filter: 'viewed' }, collapsed: false },
        { id: 'a3', type: 'dashboards', width: 12, config: { limit: 5, filter: 'all', showThumbnails: true }, collapsed: false },
        { id: 'a4', type: 'charts', width: 12, config: { limit: 5, filter: 'all', showThumbnails: true }, collapsed: false }
      ],
      sidebar: [
        { id: 'as1', type: 'data-quality-alerts', width: 12, config: { limit: 5 }, collapsed: false },
        { id: 'as2', type: 'team-activity', width: 12, config: { limit: 4 }, collapsed: false }
      ]
    }
  },
  {
    id: 'preset-minimal',
    name: 'Minimal',
    createdAt: '2024-01-01T00:00:00.000Z',
    layout: {
      header: [],
      main: [
        { id: 'min1', type: 'recents', width: 12, config: { limit: 6, filter: 'viewed' }, collapsed: false },
        { id: 'min2', type: 'dashboards', width: 12, config: { limit: 8, filter: 'all', showThumbnails: false }, collapsed: false }
      ],
      sidebar: [
        { id: 'mins1', type: 'quick-links', width: 12, config: { links: [
          { title: 'SQL Lab', url: '#', icon: 'database' },
          { title: 'Create Dashboard', url: '#', icon: 'dashboard' },
          { title: 'Upload Data', url: '#', icon: 'file' }
        ]}, collapsed: false }
      ]
    }
  },
  {
    id: 'preset-data-engineer',
    name: 'Data Engineer',
    createdAt: '2024-01-01T00:00:00.000Z',
    layout: {
      header: [],
      main: [
        { id: 'de1', type: 'data-quality-alerts', width: 12, config: { limit: 5 }, collapsed: false },
        { id: 'de2', type: 'saved-queries', width: 12, config: { limit: 8 }, collapsed: false },
        { id: 'de3', type: 'query-results-preview', width: 12, config: { queryId: null, queryName: 'Select a query', limit: 10 }, collapsed: false },
        { id: 'de4', type: 'changelog', width: 12, config: { limit: 3 }, collapsed: false }
      ],
      sidebar: [
        { id: 'des1', type: 'quick-links', width: 12, config: { links: [
          { title: 'SQL Lab', url: '#', icon: 'database' },
          { title: 'Data Sources', url: '#', icon: 'database' },
          { title: 'Query History', url: '#', icon: 'history' }
        ]}, collapsed: false },
        { id: 'des2', type: 'team-activity', width: 12, config: { limit: 5 }, collapsed: false },
        { id: 'des3', type: 'announcements', width: 12, config: { limit: 2 }, collapsed: false }
      ]
    }
  }
];

// Mock data
const MOCK_RECENTS = [
  { name: 'FCC New Coder Survey 2018', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: 'COVID Vaccine Dashboard', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: '[ untitled dashboard ]', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: 'Sales Dashboard', time: 'Viewed 18 hours ago', type: 'dashboard' },
];

const MOCK_DASHBOARDS = [
  { name: 'Sales Dashboard', modified: 'Modified 2 minutes ago', status: 'published' },
  { name: '[ untitled dashboard ]', modified: 'Modified 18 hours ago', status: 'draft' },
  { name: '[ untitled dashboard ]', modified: 'Modified 20 hours ago', status: 'draft' },
  { name: 'FCC New Coder Survey...', modified: 'Modified 20 hours ago', status: 'published' },
  { name: 'COVID Vaccine Dashbo...', modified: 'Modified 20 hours ago', status: 'published' },
];

const MOCK_CHARTS = [
  { name: 'Weekly Threads', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Weekly Messages', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Members per Channel', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Cross Channel Relation...', modified: 'Modified 20 hours ago', type: 'Area' },
  { name: 'New Members per Month', modified: 'Modified 20 hours ago', type: 'Line' },
];

const MOCK_QUERIES = [
  { name: 'Top Customers', database: 'Production', modified: '1 day ago' },
  { name: 'Monthly Revenue', database: 'Analytics', modified: '2 days ago' },
  { name: 'User Segments', database: 'Production', modified: '1 week ago' }
];

// Mock data for new widgets
const MOCK_DATA_QUALITY_ALERTS = [
  { id: 1, severity: 'error', message: 'Missing values detected in sales_data.revenue column', dataset: 'sales_data', time: '2 hours ago' },
  { id: 2, severity: 'warning', message: 'Schema drift detected in user_events table', dataset: 'user_events', time: '5 hours ago' },
  { id: 3, severity: 'info', message: 'Data freshness check passed for all datasets', dataset: 'all', time: '1 day ago' },
  { id: 4, severity: 'warning', message: 'Duplicate records found in customers table', dataset: 'customers', time: '2 days ago' },
  { id: 5, severity: 'error', message: 'ETL pipeline failed for marketing_campaigns', dataset: 'marketing_campaigns', time: '3 days ago' },
];

const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: 'Scheduled Maintenance', content: 'System will be down for maintenance on Sunday 2AM-4AM UTC', priority: 'high', date: '2 hours ago', author: 'Admin' },
  { id: 2, title: 'New Feature: AI Suggestions', content: 'Try our new AI-powered dashboard suggestions feature!', priority: 'medium', date: '1 day ago', author: 'Product Team' },
  { id: 3, title: 'Q4 Data Available', content: 'Q4 2024 financial data is now available in the Analytics database', priority: 'low', date: '3 days ago', author: 'Data Team' },
];

const MOCK_CHANGELOG = [
  { id: 1, version: 'v4.1.0', title: 'Performance Improvements', changes: ['50% faster dashboard loading', 'Optimized SQL Lab queries', 'Reduced memory usage'], date: '1 week ago' },
  { id: 2, version: 'v4.0.5', title: 'Bug Fixes', changes: ['Fixed chart export issue', 'Resolved timezone handling', 'Fixed filter sync'], date: '2 weeks ago' },
  { id: 3, version: 'v4.0.4', title: 'Security Updates', changes: ['Updated dependencies', 'Enhanced authentication', 'Fixed XSS vulnerability'], date: '3 weeks ago' },
];

const MOCK_TEAM_ACTIVITY = [
  { id: 1, user: 'Alice Chen', action: 'created', item: 'Sales Performance Dashboard', type: 'dashboard', time: '10 minutes ago', avatar: 'A' },
  { id: 2, user: 'Bob Smith', action: 'modified', item: 'Monthly Revenue Chart', type: 'chart', time: '30 minutes ago', avatar: 'B' },
  { id: 3, user: 'Carol Davis', action: 'shared', item: 'Customer Segmentation', type: 'dataset', time: '1 hour ago', avatar: 'C' },
  { id: 4, user: 'David Lee', action: 'commented on', item: 'KPI Dashboard', type: 'dashboard', time: '2 hours ago', avatar: 'D' },
  { id: 5, user: 'Eva Martinez', action: 'ran', item: 'Daily ETL Query', type: 'query', time: '3 hours ago', avatar: 'E' },
];

const MOCK_PINNED_DASHBOARDS = [
  { id: 1, name: 'Executive Summary', owner: 'Admin', views: 1234, pinned: true },
  { id: 2, name: 'Sales Performance', owner: 'Sales Team', views: 856, pinned: true },
  { id: 3, name: 'Marketing Analytics', owner: 'Marketing', views: 642, pinned: true },
  { id: 4, name: 'Product Metrics', owner: 'Product Team', views: 521, pinned: true },
];

const MOCK_RECENT_DATABASES = [
  { id: 1, name: 'Production PostgreSQL', type: 'postgresql', lastUsed: '5 minutes ago', status: 'online' },
  { id: 2, name: 'Analytics Snowflake', type: 'snowflake', lastUsed: '1 hour ago', status: 'online' },
  { id: 3, name: 'Data Warehouse', type: 'bigquery', lastUsed: '2 hours ago', status: 'online' },
  { id: 4, name: 'Staging MySQL', type: 'mysql', lastUsed: '1 day ago', status: 'offline' },
];

const MOCK_TAGS = [
  { name: 'sales', count: 45, color: '#1890ff' },
  { name: 'marketing', count: 32, color: '#52c41a' },
  { name: 'finance', count: 28, color: '#faad14' },
  { name: 'product', count: 24, color: '#eb2f96' },
  { name: 'hr', count: 18, color: '#722ed1' },
  { name: 'operations', count: 15, color: '#13c2c2' },
  { name: 'customer', count: 42, color: '#fa541c' },
  { name: 'analytics', count: 38, color: '#2f54eb' },
  { name: 'reports', count: 29, color: '#a0d911' },
  { name: 'kpi', count: 21, color: '#fadb14' },
];

const MOCK_REPORTS_SCHEDULE = [
  { id: 1, name: 'Daily Sales Report', frequency: 'Daily', nextRun: 'Tomorrow 6:00 AM', recipients: 5, status: 'active' },
  { id: 2, name: 'Weekly KPI Summary', frequency: 'Weekly', nextRun: 'Monday 9:00 AM', recipients: 12, status: 'active' },
  { id: 3, name: 'Monthly Executive Report', frequency: 'Monthly', nextRun: 'Jan 1, 2025', recipients: 8, status: 'active' },
  { id: 4, name: 'Quarterly Review', frequency: 'Quarterly', nextRun: 'Apr 1, 2025', recipients: 3, status: 'paused' },
];

const MOCK_CERTIFICATIONS = [
  { id: 1, name: 'Sales Dashboard', type: 'dashboard', certifiedBy: 'Data Team', certifiedAt: '1 month ago', description: 'Official sales metrics' },
  { id: 2, name: 'Customer Dataset', type: 'dataset', certifiedBy: 'Admin', certifiedAt: '2 months ago', description: 'Verified customer data' },
  { id: 3, name: 'Revenue Chart', type: 'chart', certifiedBy: 'Finance Team', certifiedAt: '3 weeks ago', description: 'Approved revenue visualization' },
  { id: 4, name: 'User Events', type: 'dataset', certifiedBy: 'Analytics', certifiedAt: '1 week ago', description: 'Validated event tracking' },
];

const MOCK_AI_SUGGESTIONS = [
  { id: 1, title: 'Sales Trend Analysis', description: 'Based on your recent queries, you might be interested in this dashboard', type: 'dashboard', confidence: 92 },
  { id: 2, title: 'Customer Churn Prediction', description: 'New dataset available that matches your analysis patterns', type: 'dataset', confidence: 87 },
  { id: 3, title: 'Revenue Forecast Chart', description: 'Similar users found this chart useful', type: 'chart', confidence: 85 },
  { id: 4, title: 'Marketing ROI Query', description: 'Recommended based on your team\'s activity', type: 'query', confidence: 78 },
];

const MOCK_QUERY_RESULTS = [
  { id: 1, customer: 'Acme Corp', revenue: '$125,000', orders: 45, region: 'North America' },
  { id: 2, customer: 'TechStart Inc', revenue: '$98,500', orders: 32, region: 'Europe' },
  { id: 3, customer: 'Global Retail', revenue: '$87,200', orders: 28, region: 'Asia Pacific' },
  { id: 4, customer: 'DataDriven LLC', revenue: '$76,800', orders: 24, region: 'North America' },
  { id: 5, customer: 'CloudFirst', revenue: '$65,400', orders: 19, region: 'Europe' },
];

// Widget Content Components
const RecentsContent = ({ config }) => {
  const [filter, setFilter] = useState(config.filter || 'viewed');
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Space css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Viewed', value: 'viewed' },
            { label: 'Edited', value: 'edited' },
            { label: 'Created', value: 'created' },
          ]}
          style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }}
        />
      </Space>
      <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
        {MOCK_RECENTS.slice(0, config.limit || 4).map((item, i) => (
          <Col flex="1 1 200px" key={i}>
            <div
              css={css`
                background: ${isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'};
                border-radius: ${token.borderRadiusLG}px;
                padding: ${token.paddingMD}px;
                cursor: pointer;
                transition: background ${token.motionDurationMid};
                &:hover {
                  background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
                }
              `}
            >
              <Space>
                <SyncOutlined css={css`color: ${token.colorTextSecondary};`} />
                <span
                  css={css`
                    color: ${token.colorText};
                    font-weight: ${token.fontWeightStrong};
                    font-size: ${token.fontSize}px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}
                >
                  {item.name}
                </span>
              </Space>
              <div css={css`margin-top: ${token.marginXS}px;`}>
                <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                  {item.time}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const DashboardsContent = ({ config }) => {
  const [filter, setFilter] = useState(config.filter || 'all');
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Favorite', value: 'favorite' },
            { label: 'Mine', value: 'mine' },
            { label: 'All', value: 'all' },
          ]}
          style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }}
        />
        <Space>
          <Button size="small" icon={<PlusOutlined />}>Dashboard</Button>
          <a css={css`color: ${token.colorPrimary}; font-size: ${token.fontSize}px;`}>View All »</a>
        </Space>
      </Flex>
      <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
        {MOCK_DASHBOARDS.slice(0, config.limit || 5).map((d, i) => (
          <Col flex="1 1 180px" key={i} css={css`max-width: 250px;`}>
            <Card
              hoverable
              css={css`
                background: ${token.colorBgContainer};
                border: 1px solid ${token.colorBorder};
              `}
              cover={config.showThumbnails && (
                <Flex
                  align="flex-end"
                  css={css`
                    height: 128px;
                    background: ${token.colorBorderSecondary};
                    padding: ${token.paddingSM}px;
                  `}
                >
                  <div
                    css={css`
                      width: 100%;
                      height: 64px;
                      background: ${token.colorTextQuaternary};
                      border-radius: ${token.borderRadiusSM}px;
                    `}
                  />
                </Flex>
              )}
              styles={{ body: { padding: token.paddingSM } }}
            >
              <Flex justify="space-between" align="flex-start">
                <span
                  css={css`
                    color: ${token.colorText};
                    font-weight: ${token.fontWeightStrong};
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: ${token.fontSize}px;
                  `}
                >
                  {d.name}
                </span>
                <Space size={4}>
                  <StarOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                  <MoreOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                </Space>
              </Flex>
              <Space css={css`margin-top: ${token.marginXS}px;`}>
                <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                  {d.modified}
                </span>
                <Tag color={d.status === 'published' ? 'success' : 'warning'} css={css`margin: 0;`}>
                  <SyncOutlined spin={false} css={css`margin-right: ${token.marginXS}px;`} />
                  {d.status === 'published' ? 'Published' : 'Draft'}
                </Tag>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const ChartsContent = ({ config }) => {
  const [filter, setFilter] = useState(config.filter || 'all');
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Favorite', value: 'favorite' },
            { label: 'Mine', value: 'mine' },
            { label: 'All', value: 'all' },
          ]}
          style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }}
        />
        <Space>
          <Button size="small" icon={<PlusOutlined />}>Chart</Button>
          <a css={css`color: ${token.colorPrimary}; font-size: ${token.fontSize}px;`}>View All »</a>
        </Space>
      </Flex>
      <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
        {MOCK_CHARTS.slice(0, config.limit || 5).map((c, i) => (
          <Col flex="1 1 180px" key={i} css={css`max-width: 250px;`}>
            <Card
              hoverable
              css={css`
                background: ${token.colorBgContainer};
                border: 1px solid ${token.colorBorder};
              `}
              cover={config.showThumbnails && (
                <Flex
                  align="flex-end"
                  justify="center"
                  css={css`
                    height: 128px;
                    background: ${token.colorBorderSecondary};
                    padding: ${token.paddingSM}px;
                  `}
                >
                  <Flex align="flex-end" css={css`height: 80px;`}>
                    {[40, 60, 35, 70, 50].map((h, j) => (
                      <div
                        key={j}
                        css={css`
                          width: 12px;
                          height: ${h}%;
                          background: ${token.colorTextQuaternary};
                          border-radius: ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0 0;
                          margin-left: ${token.marginXS}px;
                        `}
                      />
                    ))}
                  </Flex>
                </Flex>
              )}
              styles={{ body: { padding: token.paddingSM } }}
            >
              <Flex justify="space-between" align="flex-start">
                <span
                  css={css`
                    color: ${token.colorText};
                    font-weight: ${token.fontWeightStrong};
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: ${token.fontSize}px;
                  `}
                >
                  {c.name}
                </span>
                <Space size={4}>
                  <StarOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                  <MoreOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                </Space>
              </Flex>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                {c.modified}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const SavedQueriesContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented value="mine" options={[{ label: 'Mine', value: 'mine' }]} style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }} />
        <Space>
          <Button size="small" icon={<PlusOutlined />}>SQL Query</Button>
          <a css={css`color: ${token.colorPrimary}; font-size: ${token.fontSize}px;`}>View All »</a>
        </Space>
      </Flex>
      <div>
        {MOCK_QUERIES.slice(0, config.limit || 5).map((q, i) => (
          <Flex
            key={i}
            align="center"
            gap={token.marginSM}
            css={css`
              padding: ${token.paddingSM}px;
              background: ${token.colorBorderSecondary};
              border-radius: ${token.borderRadiusLG}px;
              cursor: pointer;
              margin-bottom: ${token.marginXS}px;
              transition: background ${token.motionDurationMid};
              &:hover {
                background: ${token.colorBorder};
              }
            `}
          >
            <DatabaseOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeLG}px;`} />
            <div css={css`flex: 1; min-width: 0;`}>
              <span
                css={css`
                  color: ${token.colorText};
                  font-weight: ${token.fontWeightStrong};
                  display: block;
                  font-size: ${token.fontSize}px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {q.name}
              </span>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                {q.database} · {q.modified}
              </span>
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};

const WelcomeBannerContent = ({ config, isEditing, onConfigure }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div
      css={css`
        background: linear-gradient(135deg, ${isDarkMode ? '#1a3a4a' : '#e6f7fc'} 0%, ${isDarkMode ? '#2d3339' : '#f7f7f7'} 100%);
        border-radius: ${token.borderRadiusLG}px;
        padding: ${token.paddingLG}px ${token.paddingXL}px;
        border: 1px solid ${isDarkMode ? 'rgba(32, 167, 201, 0.3)' : 'rgba(32, 167, 201, 0.2)'};
        position: relative;
      `}
    >
      {isEditing && (
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={onConfigure}
          css={css`
            position: absolute;
            top: ${token.paddingSM}px;
            right: ${token.paddingSM}px;
            color: ${token.colorPrimary};
            background: ${isDarkMode ? 'rgba(32, 167, 201, 0.2)' : 'rgba(32, 167, 201, 0.15)'};
            border-radius: ${token.borderRadius}px;
            &:hover {
              background: ${isDarkMode ? 'rgba(32, 167, 201, 0.3)' : 'rgba(32, 167, 201, 0.25)'};
              color: ${token.colorPrimary};
            }
          `}
        />
      )}
      <Flex align="center" gap={token.marginLG}>
        <img
          src="/em-logo.jpg"
          alt="Logo"
          css={css`
            width: 64px;
            height: 64px;
            border-radius: 50%;
            object-fit: cover;
          `}
        />
        <div>
          <h2 css={css`margin: 0 0 ${token.marginXS}px 0; color: ${token.colorText}; font-size: 24px; font-weight: 600;`}>
            {config.title || 'Welcome to Superset'}
          </h2>
          <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSize}px;`}>
            {config.subtitle || 'Your data exploration platform'}
          </Text>
        </div>
      </Flex>
    </div>
  );
};

const MarkdownContent = ({ config }) => {
  const { token } = useToken();
  return (
    <div css={css`color: ${token.colorText};`}>
      <div dangerouslySetInnerHTML={{ __html: config.content?.replace(/##\s/g, '<h2>').replace(/\n/g, '<br/>') || 'No content' }} />
    </div>
  );
};

const QuickLinksContent = ({ config }) => {
  const { token } = useToken();
  const links = config.links || [
    { title: 'Documentation', url: '#' },
    { title: 'SQL Lab', url: '#' },
    { title: 'Create Dashboard', url: '#' }
  ];
  return (
    <Space direction="vertical" css={css`width: 100%;`}>
      {links.map((link, i) => (
        <a key={i} href={link.url} css={css`color: ${token.colorPrimary}; display: flex; align-items: center; gap: 8px;`}>
          <LinkOutlined /> {link.title}
        </a>
      ))}
    </Space>
  );
};

// === NEW WIDGET CONTENT COMPONENTS ===

// Data & Analytics Widgets
const EmbeddedChartContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <div css={css`background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadiusLG}px; padding: ${token.paddingLG}px; height: ${config.height || 300}px; display: flex; flex-direction: column; align-items: center; justify-content: center;`}>
      <LineChartOutlined css={css`font-size: 48px; color: ${token.colorPrimary}; margin-bottom: ${token.marginMD}px;`} />
      <Text css={css`color: ${token.colorTextSecondary};`}>{config.chartName || 'Select a chart to embed'}</Text>
      {!config.chartId && <Button type="primary" size="small" css={css`margin-top: ${token.marginMD}px;`}>Select Chart</Button>}
    </div>
  );
};

const KPICardsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const kpis = config.kpis || [];
  return (
    <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
      {kpis.map((kpi, i) => (
        <Col flex="1 1 150px" key={i}>
          <Card css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingMD } }}>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{kpi.label}</Text>
            <Flex align="baseline" gap={token.marginSM}>
              <span css={css`font-size: 24px; font-weight: 600; color: ${token.colorText};`}>{kpi.value}</span>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${kpi.trend === 'up' ? token.colorSuccess : token.colorError};`}>{kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}</span>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const DataQualityAlertsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const getSeverityColor = (s) => s === 'error' ? token.colorError : s === 'warning' ? token.colorWarning : token.colorPrimary;
  const getSeverityIcon = (s) => s === 'error' ? <ExclamationCircleOutlined /> : s === 'warning' ? <WarningOutlined /> : <InfoCircleOutlined />;
  return (
    <div>
      {MOCK_DATA_QUALITY_ALERTS.slice(0, config.limit || 5).map((alert) => (
        <Flex key={alert.id} align="flex-start" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px; border-left: 3px solid ${getSeverityColor(alert.severity)};`}>
          <span css={css`color: ${getSeverityColor(alert.severity)}; font-size: ${token.fontSizeLG}px;`}>{getSeverityIcon(alert.severity)}</span>
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-size: ${token.fontSize}px; display: block;`}>{alert.message}</Text>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>{alert.dataset} · {alert.time}</Text>
          </div>
        </Flex>
      ))}
    </div>
  );
};

const QueryResultsPreviewContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Text strong css={css`color: ${token.colorText};`}>{config.queryName || 'Top Customers Query'}</Text>
        <Button size="small" icon={<TableOutlined />}>Open in SQL Lab</Button>
      </Flex>
      <div css={css`overflow-x: auto;`}>
        <table css={css`width: 100%; border-collapse: collapse; font-size: ${token.fontSizeSM}px;`}>
          <thead>
            <tr css={css`background: ${isDarkMode ? '#363D44' : '#F5F5F5'};`}>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Customer</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Revenue</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Orders</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Region</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QUERY_RESULTS.slice(0, config.limit || 5).map((row) => (
              <tr key={row.id} css={css`&:hover { background: ${isDarkMode ? '#3D444D' : '#FAFAFA'}; }`}>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.customer}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.revenue}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.orders}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Communication Widgets
const AnnouncementsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const getPriorityColor = (p) => p === 'high' ? token.colorError : p === 'medium' ? token.colorWarning : token.colorPrimary;
  return (
    <div>
      {MOCK_ANNOUNCEMENTS.slice(0, config.limit || 3).map((a) => (
        <Card key={a.id} css={css`margin-bottom: ${token.marginSM}px; background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder}; border-left: 3px solid ${getPriorityColor(a.priority)};`} styles={{ body: { padding: token.paddingSM } }}>
          <Flex align="center" gap={token.marginXS}>
            <NotificationOutlined css={css`color: ${getPriorityColor(a.priority)};`} />
            <Text strong css={css`color: ${token.colorText};`}>{a.title}</Text>
          </Flex>
          <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{a.content}</Text>
          <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{a.author} · {a.date}</Text>
        </Card>
      ))}
    </div>
  );
};

const ChangelogContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <div>
      {MOCK_CHANGELOG.slice(0, config.limit || 3).map((entry) => (
        <div key={entry.id} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginSM}px;`}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={token.marginXS}><Tag color="blue">{entry.version}</Tag><Text strong css={css`color: ${token.colorText};`}>{entry.title}</Text></Flex>
            <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{entry.date}</Text>
          </Flex>
          <ul css={css`margin: ${token.marginXS}px 0 0 ${token.marginMD}px; padding: 0; color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>
            {entry.changes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TeamActivityContent = ({ config }) => {
  const { token } = useToken();
  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : t === 'dataset' ? <DatabaseOutlined /> : <TableOutlined />;
  return (
    <div>
      {MOCK_TEAM_ACTIVITY.slice(0, config.limit || 5).map((a) => (
        <Flex key={a.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingXS}px 0; border-bottom: 1px solid ${token.colorBorderSecondary}; &:last-child { border-bottom: none; }`}>
          <div css={css`width: 32px; height: 32px; border-radius: 50%; background: ${token.colorPrimary}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: ${token.fontSizeSM}px;`}>{a.avatar}</div>
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-size: ${token.fontSize}px;`}><strong>{a.user}</strong> {a.action} <span css={css`color: ${token.colorPrimary};`}>{a.item}</span></Text>
            <Flex align="center" gap={token.marginXS}><span css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{getTypeIcon(a.type)}</span><Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{a.time}</Text></Flex>
          </div>
        </Flex>
      ))}
    </div>
  );
};

// Navigation & Productivity Widgets
const PinnedDashboardsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <Row gutter={[token.marginSM, token.marginSM]} css={css`flex-wrap: wrap;`}>
      {MOCK_PINNED_DASHBOARDS.slice(0, config.limit || 4).map((d) => (
        <Col flex="1 1 200px" key={d.id}>
          <Card hoverable css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
            <Flex align="center" gap={token.marginXS}><PushpinOutlined css={css`color: ${token.colorPrimary};`} /><Text strong css={css`color: ${token.colorText}; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`}>{d.name}</Text></Flex>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{d.owner} · {d.views} views</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const SearchBoxContent = ({ config }) => {
  const { token } = useToken();
  return (
    <div>
      <Input size="large" placeholder={config.placeholder || 'Search dashboards, charts, datasets...'} prefix={<SearchOutlined css={css`color: ${token.colorTextTertiary};`} />} css={css`border-radius: ${token.borderRadiusLG}px;`} />
      <Flex gap={token.marginXS} css={css`margin-top: ${token.marginSM}px;`}><Tag css={css`cursor: pointer;`}>Dashboards</Tag><Tag css={css`cursor: pointer;`}>Charts</Tag><Tag css={css`cursor: pointer;`}>Datasets</Tag><Tag css={css`cursor: pointer;`}>Queries</Tag></Flex>
    </div>
  );
};

const RecentDatabasesContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <div>
      {MOCK_RECENT_DATABASES.slice(0, config.limit || 5).map((db) => (
        <Flex key={db.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px; cursor: pointer; &:hover { background: ${isDarkMode ? '#3D444D' : '#E8E8E8'}; }`}>
          <DatabaseOutlined css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`} />
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-weight: 500;`}>{db.name}</Text>
            <Flex align="center" gap={token.marginXS}><Tag css={css`margin: 0;`}>{db.type}</Tag><Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{db.lastUsed}</Text></Flex>
          </div>
          <Tag color={db.status === 'online' ? 'success' : 'default'}>{db.status}</Tag>
        </Flex>
      ))}
    </div>
  );
};

// Organization Widgets
const TagCloudContent = ({ config }) => {
  const { token } = useToken();
  return (
    <Flex wrap="wrap" gap={4}>
      {MOCK_TAGS.slice(0, config.limit || 20).map((tag) => (
        <Tag key={tag.name} color={tag.color} css={css`cursor: pointer; font-size: ${Math.min(11 + tag.count / 10, 14)}px; padding: 2px 6px; margin: 0; line-height: 1.4;`}>{tag.name} ({tag.count})</Tag>
      ))}
    </Flex>
  );
};

const ReportsScheduleContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  return (
    <div>
      {MOCK_REPORTS_SCHEDULE.slice(0, config.limit || 5).map((r) => (
        <Flex key={r.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px;`}>
          <CalendarOutlined css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`} />
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-weight: 500;`}>{r.name}</Text>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{r.frequency} · Next: {r.nextRun}</Text>
          </div>
          <Tag color={r.status === 'active' ? 'success' : 'default'}>{r.status}</Tag>
        </Flex>
      ))}
    </div>
  );
};

const CertificationsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const [filter, setFilter] = useState(config.filter || 'all');
  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : <DatabaseOutlined />;
  return (
    <div>
      <Segmented value={filter} onChange={setFilter} options={[{ label: 'All', value: 'all' }, { label: 'Dashboards', value: 'dashboard' }, { label: 'Datasets', value: 'dataset' }, { label: 'Charts', value: 'chart' }]} style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }} css={css`margin-bottom: ${token.marginMD}px;`} />
      <Row gutter={[token.marginSM, token.marginSM]} css={css`flex-wrap: wrap;`}>
        {MOCK_CERTIFICATIONS.filter(c => filter === 'all' || c.type === filter).slice(0, config.limit || 6).map((c) => (
          <Col flex="1 1 200px" key={c.id}>
            <Card css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
              <Flex align="center" gap={token.marginXS}><SafetyCertificateOutlined css={css`color: ${token.colorSuccess};`} /><Text strong css={css`color: ${token.colorText};`}>{c.name}</Text></Flex>
              <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{c.description}</Text>
              <Flex align="center" gap={token.marginXS} css={css`margin-top: ${token.marginXS}px;`}>{getTypeIcon(c.type)}<Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>Certified by {c.certifiedBy}</Text></Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// AI-Powered Widgets
const AISuggestionsContent = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : t === 'dataset' ? <DatabaseOutlined /> : <TableOutlined />;
  return (
    <div>
      <Flex align="center" gap={token.marginXS} css={css`margin-bottom: ${token.marginMD}px;`}><RobotOutlined css={css`color: ${token.colorPrimary};`} /><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>Personalized recommendations based on your activity</Text></Flex>
      {MOCK_AI_SUGGESTIONS.slice(0, config.limit || 4).map((s) => (
        <Card key={s.id} hoverable css={css`margin-bottom: ${token.marginSM}px; background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
          <Flex justify="space-between" align="flex-start">
            <Flex align="center" gap={token.marginSM}><span css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`}>{getTypeIcon(s.type)}</span><div><Text strong css={css`color: ${token.colorText};`}>{s.title}</Text><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{s.description}</Text></div></Flex>
            <Tag color="blue">{s.confidence}% match</Tag>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

const NaturalLanguageQueryContent = ({ config }) => {
  const { token } = useToken();
  const [query, setQuery] = useState('');
  const isDarkMode = useDarkMode();
  return (
    <div>
      <Flex align="center" gap={token.marginXS} css={css`margin-bottom: ${token.marginMD}px;`}><RobotOutlined css={css`color: ${token.colorPrimary}; font-size: 20px;`} /><Text css={css`color: ${token.colorText}; font-weight: 500;`}>Ask your data a question</Text><Tag color="purple">AI Beta</Tag></Flex>
      <Input.TextArea value={query} onChange={(e) => setQuery(e.target.value)} placeholder={config.placeholder || 'Ask a question about your data...'} rows={3} css={css`margin-bottom: ${token.marginMD}px;`} />
      <Flex justify="space-between" align="center">
        <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>Try: "What was total revenue last month?"</Text>
        <Button type="primary" icon={<MessageOutlined />}>Ask AI</Button>
      </Flex>
      {query && <div css={css`margin-top: ${token.marginMD}px; padding: ${token.paddingMD}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; border-left: 3px solid ${token.colorPrimary};`}><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>AI is analyzing your query...</Text></div>}
    </div>
  );
};

const WIDGET_CONTENT = {
  'welcome-banner': WelcomeBannerContent,
  'recents': RecentsContent,
  'dashboards': DashboardsContent,
  'charts': ChartsContent,
  'saved-queries': SavedQueriesContent,
  'markdown': MarkdownContent,
  'quick-links': QuickLinksContent,
  'embedded-chart': EmbeddedChartContent,
  'kpi-cards': KPICardsContent,
  'data-quality-alerts': DataQualityAlertsContent,
  'query-results-preview': QueryResultsPreviewContent,
  'announcements': AnnouncementsContent,
  'changelog': ChangelogContent,
  'team-activity': TeamActivityContent,
  'pinned-dashboards': PinnedDashboardsContent,
  'search-box': SearchBoxContent,
  'recent-databases': RecentDatabasesContent,
  'tag-cloud': TagCloudContent,
  'reports-schedule': ReportsScheduleContent,
  'certifications': CertificationsContent,
  'ai-suggestions': AISuggestionsContent,
  'natural-language-query': NaturalLanguageQueryContent,
};

// Drop Zone Component
const DropZone = ({ isEditing, onDragOver, onDragLeave, onDrop, isActive }) => {
  const { token } = useToken();

  if (!isEditing) return null;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver(e);
  };

  return (
    <Flex
      align="center"
      justify="center"
      onDragOver={handleDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      css={css`
        height: ${isActive ? 48 : 24}px;
        margin: ${token.marginXS}px 0;
        border: 2px dashed ${isActive ? token.colorPrimary : token.colorBorder};
        border-radius: ${token.borderRadius}px;
        background: ${isActive ? 'rgba(32, 167, 201, 0.15)' : 'rgba(32, 167, 201, 0.05)'};
        transition: all ${token.motionDurationMid};
        &:hover {
          border-color: ${token.colorPrimary};
          background: rgba(32, 167, 201, 0.1);
        }
      `}
    >
      {isActive ? (
        <span css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeSM}px; font-weight: ${token.fontWeightStrong};`}>
          Drop here
        </span>
      ) : (
        <span css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>
          Drop zone
        </span>
      )}
    </Flex>
  );
};

// Section Widget Component
const SectionWidget = ({ widget, isEditing, onRemove, onConfigure, onToggleCollapse, onDragStart, isDragging }) => {
  const widgetDef = WIDGET_TYPES[widget.type];
  const ContentComponent = WIDGET_CONTENT[widget.type];
  const isCollapsed = widget.collapsed;
  const { token } = useToken();

  return (
    <div
      draggable={isEditing}
      onDragStart={(e) => onDragStart(e, widget)}
      css={css`
        opacity: ${isDragging ? 0.5 : 1};
        margin-bottom: ${token.marginXS}px;
        border: ${isEditing ? `1px dashed ${token.colorBorder}` : 'none'};
        border-radius: ${token.borderRadiusLG}px;
        padding: ${isEditing ? token.paddingXS : 0}px;
        background: ${isEditing ? token.colorFillQuaternary : 'transparent'};
        transition: all ${token.motionDurationMid};
      `}
    >
      <Flex
        align="center"
        gap={token.marginXS}
        css={css`
          padding: ${isEditing ? `${token.paddingXS}px` : `${token.paddingXS}px 0`};
          cursor: pointer;
          border-radius: ${token.borderRadiusSM}px;
          &:hover {
            background: ${isEditing ? token.colorFillTertiary : 'transparent'};
          }
        `}
        onClick={() => onToggleCollapse(widget.id)}
      >
        {isEditing && <HolderOutlined css={css`color: ${token.colorTextTertiary}; cursor: grab;`} />}
        {isCollapsed ? (
          <RightOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`} />
        ) : (
          <DownOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`} />
        )}
        <span css={css`color: ${token.colorText}; font-weight: ${token.fontWeightStrong}; font-size: ${token.fontSize}px;`}>
          {widgetDef?.name || widget.type}
        </span>

        {isEditing && (
          <Space css={css`margin-left: auto;`}>
            <Button
              type="text"
              size="small"
              icon={<SettingOutlined css={css`color: ${token.colorTextSecondary};`} />}
              onClick={(e) => { e.stopPropagation(); onConfigure(widget); }}
            />
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined css={css`color: ${token.colorError};`} />}
              onClick={(e) => { e.stopPropagation(); onRemove(widget.id); }}
            />
          </Space>
        )}
      </Flex>

      {!isCollapsed && (
        <div css={css`margin-top: ${token.marginXS}px; margin-bottom: ${token.marginLG}px;`}>
          {ContentComponent ? <ContentComponent config={widget.config} isEditing={isEditing} onConfigure={() => onConfigure(widget)} /> : (
            <Text type="secondary">Widget content</Text>
          )}
        </div>
      )}
    </div>
  );
};

// Widget Picker Component
const WidgetPicker = ({ onAddWidget, currentRegion }) => {
  const { token } = useToken();

  // Organize categories into logical groups for 3-column layout
  const categoryGroups = [
    // Column 1: Data & Analytics
    {
      title: 'Data & Analytics',
      icon: <BarChartOutlined />,
      color: token.colorPrimary,
      categories: ['data', 'analytics']
    },
    // Column 2: Content & Communication
    {
      title: 'Content & Communication',
      icon: <FileTextOutlined />,
      color: token.colorSuccess,
      categories: ['content', 'communication']
    },
    // Column 3: Navigation, Organization & AI
    {
      title: 'Tools & AI',
      icon: <RobotOutlined />,
      color: token.colorWarning,
      categories: ['navigation', 'organization', 'ai']
    }
  ];

  const categoryNames = {
    data: 'Data',
    analytics: 'Analytics',
    content: 'Content',
    communication: 'Communication',
    navigation: 'Navigation',
    organization: 'Organization',
    ai: 'AI-Powered'
  };

  // Build widget lists per category
  const widgetsByCategory = {};
  Object.values(WIDGET_TYPES).forEach(w => {
    if (w.allowedRegions.includes(currentRegion)) {
      if (!widgetsByCategory[w.category]) {
        widgetsByCategory[w.category] = [];
      }
      widgetsByCategory[w.category].push(w);
    }
  });

  return (
    <Row gutter={[token.marginLG, token.marginMD]}>
      {categoryGroups.map((group, groupIndex) => {
        const hasWidgets = group.categories.some(cat => widgetsByCategory[cat]?.length > 0);
        if (!hasWidgets) return null;

        return (
          <Col span={8} key={groupIndex}>
            <div css={css`
              background: ${token.colorFillQuaternary};
              border-radius: ${token.borderRadiusLG}px;
              padding: ${token.paddingMD}px;
              height: 100%;
              border: 1px solid ${token.colorBorderSecondary};
            `}>
              {/* Group Header */}
              <Flex align="center" gap={token.marginXS} css={css`
                margin-bottom: ${token.marginMD}px;
                padding-bottom: ${token.paddingSM}px;
                border-bottom: 2px solid ${group.color};
              `}>
                <span css={css`
                  color: ${group.color};
                  font-size: ${token.fontSizeLG}px;
                `}>
                  {group.icon}
                </span>
                <Text strong css={css`
                  font-size: ${token.fontSizeSM}px;
                  color: ${token.colorText};
                `}>
                  {group.title}
                </Text>
              </Flex>

              {/* Categories within this group */}
              {group.categories.map(catKey => {
                const widgets = widgetsByCategory[catKey];
                if (!widgets?.length) return null;

                return (
                  <div key={catKey} css={css`margin-bottom: ${token.marginMD}px;`}>
                    <Text type="secondary" css={css`
                      font-size: 11px;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      font-weight: 600;
                    `}>
                      {categoryNames[catKey]}
                    </Text>
                    <div css={css`margin-top: ${token.marginXS}px;`}>
                      {widgets.map(w => (
                        <div
                          key={w.id}
                          onClick={() => onAddWidget(w.id)}
                          css={css`
                            display: flex;
                            align-items: center;
                            gap: ${token.marginXS}px;
                            padding: ${token.paddingXS}px ${token.paddingSM}px;
                            margin-bottom: ${token.marginXXS || 4}px;
                            border-radius: ${token.borderRadius}px;
                            cursor: pointer;
                            transition: all ${token.motionDurationMid};
                            background: transparent;

                            &:hover {
                              background: ${token.colorFillSecondary};
                              transform: translateX(4px);
                            }
                          `}
                        >
                          <span css={css`
                            color: ${token.colorTextSecondary};
                            font-size: ${token.fontSize}px;
                            display: flex;
                            align-items: center;
                          `}>
                            {w.icon}
                          </span>
                          <Text css={css`
                            font-size: ${token.fontSizeSM}px;
                            color: ${token.colorText};
                          `}>
                            {w.name}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

// localStorage keys
const STORAGE_KEYS = {
  layout: 'superset-homepage-layout',
  preferences: 'superset-homepage-preferences',
  savedHomepages: 'superset-saved-homepages'
};

// Load saved data from localStorage
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

// Main Homepage Builder Component
export default function HomepageBuilder() {
  const stored = loadFromStorage();

  const [layout, setLayout] = useState(stored.layout || INITIAL_LAYOUT);
  const [isEditing, setIsEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerRegion, setPickerRegion] = useState('main');
  const [configWidget, setConfigWidget] = useState(null);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [savedLayout, setSavedLayout] = useState(null);
  const [showThumbnails, setShowThumbnails] = useState(stored.preferences?.showThumbnails ?? true);
  const [isDarkMode, setIsDarkMode] = useState(stored.preferences?.isDarkMode ?? true);
  const [activeDropZone, setActiveDropZone] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(stored.preferences?.sidebarCollapsed ?? false);
  const [sidebarWidth, setSidebarWidth] = useState(stored.preferences?.sidebarWidth ?? 400);

  // Saved homepages state
  const [savedHomepages, setSavedHomepages] = useState(stored.savedHomepages || []);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newHomepageName, setNewHomepageName] = useState('');
  const [selectedHomepageId, setSelectedHomepageId] = useState('preset-default');

  const currentTheme = isDarkMode ? getDarkTheme() : getLightTheme();

  const handleDragStart = (e, widget) => {
    setDraggedWidget(widget);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
    setActiveDropZone(null);
  };

  const handleDropZoneDragOver = (e, zoneId) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropZone(zoneId);
  };

  const handleDropZoneDragLeave = (e) => {
    e.preventDefault();
    setActiveDropZone(null);
  };

  const handleDropAtIndex = (region, index) => {
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
    const draggedIndex = draggedRegion ? layout[draggedRegion].findIndex(w => w.id === draggedWidget.id) : -1;

    Object.keys(newLayout).forEach(r => {
      newLayout[r] = newLayout[r].filter(w => w.id !== draggedWidget.id);
    });

    let adjustedIndex = index;
    if (draggedRegion === region && draggedIndex < index) {
      adjustedIndex = index - 1;
    }

    newLayout[region].splice(adjustedIndex, 0, draggedWidget);
    setLayout(newLayout);
    setDraggedWidget(null);
    setActiveDropZone(null);
  };

  const handleDrop = (region, targetWidget = null) => {
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
    const draggedIndex = draggedRegion ? layout[draggedRegion].findIndex(w => w.id === draggedWidget.id) : -1;
    const targetIndex = targetWidget ? layout[region].findIndex(w => w.id === targetWidget.id) : -1;

    Object.keys(newLayout).forEach(r => {
      newLayout[r] = newLayout[r].filter(w => w.id !== draggedWidget.id);
    });

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
  };

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

  const handleUpdateHomepage = () => {
    if (!selectedHomepageId) return;
    const updatedHomepages = savedHomepages.map(h =>
      h.id === selectedHomepageId
        ? { ...h, layout: JSON.parse(JSON.stringify(layout)), updatedAt: new Date().toISOString() }
        : h
    );
    setSavedHomepages(updatedHomepages);
    localStorage.setItem(STORAGE_KEYS.savedHomepages, JSON.stringify(updatedHomepages));
    const homepage = savedHomepages.find(h => h.id === selectedHomepageId);
    message.success(`Homepage "${homepage?.name}" updated!`);
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
          savedHomepages={savedHomepages}
          selectedHomepageId={selectedHomepageId}
          showSaveModal={showSaveModal}
          setShowSaveModal={setShowSaveModal}
          newHomepageName={newHomepageName}
          setNewHomepageName={setNewHomepageName}
          handleSaveAsHomepage={handleSaveAsHomepage}
          handleLoadHomepage={handleLoadHomepage}
          handleDeleteHomepage={handleDeleteHomepage}
          handleUpdateHomepage={handleUpdateHomepage}
        />
      </ConfigProvider>
    </DarkModeContext.Provider>
  );
}

// Separated content component to use token inside ConfigProvider
function HomepageBuilderContent({
  layout, isEditing, setIsEditing, showPicker, setShowPicker,
  pickerRegion, setPickerRegion, configWidget, setConfigWidget,
  draggedWidget, savedLayout, setSavedLayout, showThumbnails, setShowThumbnails,
  isDarkMode, setIsDarkMode, activeDropZone, sidebarCollapsed, setSidebarCollapsed,
  sidebarWidth, setSidebarWidth,
  handleDragStart, handleDragEnd, handleDropZoneDragOver, handleDropZoneDragLeave,
  handleDropAtIndex, handleDrop, handleAddWidget, handleRemoveWidget,
  handleToggleCollapse, handleConfigSave, handleSave, handleCancel, handleReset, handleClear,
  savedHomepages, selectedHomepageId, showSaveModal, setShowSaveModal,
  newHomepageName, setNewHomepageName, handleSaveAsHomepage, handleLoadHomepage,
  handleDeleteHomepage, handleUpdateHomepage
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
        {/* Left side */}
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

        {/* Right side */}
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
                    {savedHomepages.map(h => (
                      <Flex key={h.id} justify="space-between" align="center" css={css`padding: 4px 0; display: none;`}>
                        <span>{h.name}</span>
                      </Flex>
                    ))}
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
          {selectedHomepageId && (
            <Button
              size="small"
              type="text"
              icon={<SaveOutlined />}
              onClick={handleUpdateHomepage}
              title="Update current homepage"
              css={css`color: ${token.colorSuccess}; &:hover { color: ${token.colorSuccess}; background: rgba(89, 181, 120, 0.1); }`}
            />
          )}
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
            {/* First drop zone - before all widgets */}
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
                <SectionWidget
                  widget={widget}
                  isEditing={isEditing}
                  onRemove={(id) => handleRemoveWidget('main', id)}
                  onConfigure={setConfigWidget}
                  onToggleCollapse={handleToggleCollapse}
                  onDragStart={handleDragStart}
                  isDragging={draggedWidget?.id === widget.id}
                />
                {/* Drop zone after each widget */}
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
              {/* First drop zone - before all sidebar widgets */}
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
                  <SectionWidget
                    widget={widget}
                    isEditing={isEditing}
                    onRemove={(id) => handleRemoveWidget('sidebar', id)}
                    onConfigure={setConfigWidget}
                    onToggleCollapse={handleToggleCollapse}
                    onDragStart={handleDragStart}
                    isDragging={draggedWidget?.id === widget.id}
                  />
                  {/* Drop zone after each widget */}
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

// Separate component for config modal content to handle state properly
function ConfigModalContent({ widget, onSave, onCancel }) {
  const [localConfig, setLocalConfig] = useState(widget.config);
  const { token } = useToken();

  const handleSave = () => {
    onSave({ ...widget, config: localConfig });
  };

  return (
    <div>
      {(widget.type === 'dashboards' || widget.type === 'charts') && (
        <>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Number of items
            </Text>
            <InputNumber
              value={localConfig.limit || 5}
              onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
              min={1}
              max={10}
              css={css`width: 100%;`}
            />
          </div>
          <Checkbox
            checked={localConfig.showThumbnails}
            onChange={(e) => setLocalConfig({ ...localConfig, showThumbnails: e.target.checked })}
          >
            <Text css={css`color: ${token.colorText};`}>Show thumbnails</Text>
          </Checkbox>
        </>
      )}

      {widget.type === 'recents' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Number of items
          </Text>
          <InputNumber
            value={localConfig.limit || 4}
            onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
            min={1}
            max={8}
            css={css`width: 100%;`}
          />
        </div>
      )}

      {widget.type === 'saved-queries' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Number of items
          </Text>
          <InputNumber
            value={localConfig.limit || 5}
            onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
            min={1}
            max={10}
            css={css`width: 100%;`}
          />
        </div>
      )}

      {widget.type === 'markdown' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Content
          </Text>
          <Input.TextArea
            value={localConfig.content || ''}
            onChange={(e) => setLocalConfig({ ...localConfig, content: e.target.value })}
            rows={6}
          />
        </div>
      )}

      {widget.type === 'welcome-banner' && (
        <>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Title
            </Text>
            <Input
              value={localConfig.title || ''}
              onChange={(e) => setLocalConfig({ ...localConfig, title: e.target.value })}
              placeholder="Welcome to Superset"
            />
          </div>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Subtitle
            </Text>
            <Input
              value={localConfig.subtitle || ''}
              onChange={(e) => setLocalConfig({ ...localConfig, subtitle: e.target.value })}
              placeholder="Your data exploration platform"
            />
          </div>
        </>
      )}

      {/* Widgets with limit configuration */}
      {['changelog', 'announcements', 'team-activity', 'data-quality-alerts', 'pinned-dashboards',
        'recent-databases', 'tag-cloud', 'reports-schedule', 'certifications', 'ai-suggestions'].includes(widget.type) && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Number of items
          </Text>
          <InputNumber
            value={localConfig.limit || 5}
            onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
            min={1}
            max={20}
            css={css`width: 100%;`}
          />
        </div>
      )}

      {/* Search box configuration */}
      {widget.type === 'search-box' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Placeholder text
          </Text>
          <Input
            value={localConfig.placeholder || ''}
            onChange={(e) => setLocalConfig({ ...localConfig, placeholder: e.target.value })}
            placeholder="Search dashboards, charts, datasets..."
          />
        </div>
      )}

      {/* Embedded chart configuration */}
      {widget.type === 'embedded-chart' && (
        <>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Chart name
            </Text>
            <Input
              value={localConfig.chartName || ''}
              onChange={(e) => setLocalConfig({ ...localConfig, chartName: e.target.value })}
              placeholder="Select a chart"
            />
          </div>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Height (px)
            </Text>
            <InputNumber
              value={localConfig.height || 300}
              onChange={(value) => setLocalConfig({ ...localConfig, height: value })}
              min={100}
              max={800}
              css={css`width: 100%;`}
            />
          </div>
        </>
      )}

      {/* Natural language query configuration */}
      {widget.type === 'natural-language-query' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Placeholder text
          </Text>
          <Input
            value={localConfig.placeholder || ''}
            onChange={(e) => setLocalConfig({ ...localConfig, placeholder: e.target.value })}
            placeholder="Ask a question about your data..."
          />
        </div>
      )}

      {/* Quick Links configuration */}
      {widget.type === 'quick-links' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            Links
          </Text>
          {(localConfig.links || []).map((link, index) => (
            <Flex key={index} gap={token.marginXS} css={css`margin-bottom: ${token.marginXS}px;`}>
              <Input
                value={link.title}
                onChange={(e) => {
                  const newLinks = [...(localConfig.links || [])];
                  newLinks[index] = { ...newLinks[index], title: e.target.value };
                  setLocalConfig({ ...localConfig, links: newLinks });
                }}
                placeholder="Link title"
                css={css`flex: 1;`}
              />
              <Input
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...(localConfig.links || [])];
                  newLinks[index] = { ...newLinks[index], url: e.target.value };
                  setLocalConfig({ ...localConfig, links: newLinks });
                }}
                placeholder="URL"
                css={css`flex: 1;`}
              />
              <Button
                size="small"
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  const newLinks = (localConfig.links || []).filter((_, i) => i !== index);
                  setLocalConfig({ ...localConfig, links: newLinks });
                }}
              />
            </Flex>
          ))}
          <Button
            size="small"
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              const newLinks = [...(localConfig.links || []), { title: '', url: '#', icon: 'link' }];
              setLocalConfig({ ...localConfig, links: newLinks });
            }}
            css={css`width: 100%; margin-top: ${token.marginXS}px;`}
          >
            Add Link
          </Button>
        </div>
      )}

      {/* KPI Cards configuration */}
      {widget.type === 'kpi-cards' && (
        <div css={css`margin-bottom: ${token.marginMD}px;`}>
          <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
            KPI Cards
          </Text>
          {(localConfig.kpis || []).map((kpi, index) => (
            <div key={index} css={css`border: 1px solid ${token.colorBorder}; border-radius: ${token.borderRadius}px; padding: ${token.paddingSM}px; margin-bottom: ${token.marginXS}px;`}>
              <Flex gap={token.marginXS} css={css`margin-bottom: ${token.marginXS}px;`}>
                <Input
                  value={kpi.label}
                  onChange={(e) => {
                    const newKpis = [...(localConfig.kpis || [])];
                    newKpis[index] = { ...newKpis[index], label: e.target.value };
                    setLocalConfig({ ...localConfig, kpis: newKpis });
                  }}
                  placeholder="Label"
                  css={css`flex: 1;`}
                />
                <Input
                  value={kpi.value}
                  onChange={(e) => {
                    const newKpis = [...(localConfig.kpis || [])];
                    newKpis[index] = { ...newKpis[index], value: e.target.value };
                    setLocalConfig({ ...localConfig, kpis: newKpis });
                  }}
                  placeholder="Value"
                  css={css`flex: 1;`}
                />
              </Flex>
              <Flex gap={token.marginXS} align="center">
                <Input
                  value={kpi.change}
                  onChange={(e) => {
                    const newKpis = [...(localConfig.kpis || [])];
                    newKpis[index] = { ...newKpis[index], change: e.target.value };
                    setLocalConfig({ ...localConfig, kpis: newKpis });
                  }}
                  placeholder="Change (e.g. +12%)"
                  css={css`flex: 1;`}
                />
                <Select
                  value={kpi.trend}
                  onChange={(value) => {
                    const newKpis = [...(localConfig.kpis || [])];
                    newKpis[index] = { ...newKpis[index], trend: value };
                    setLocalConfig({ ...localConfig, kpis: newKpis });
                  }}
                  options={[
                    { label: 'Up', value: 'up' },
                    { label: 'Down', value: 'down' }
                  ]}
                  css={css`width: 80px;`}
                />
                <Button
                  size="small"
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => {
                    const newKpis = (localConfig.kpis || []).filter((_, i) => i !== index);
                    setLocalConfig({ ...localConfig, kpis: newKpis });
                  }}
                />
              </Flex>
            </div>
          ))}
          <Button
            size="small"
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              const newKpis = [...(localConfig.kpis || []), { label: '', value: '', change: '', trend: 'up' }];
              setLocalConfig({ ...localConfig, kpis: newKpis });
            }}
            css={css`width: 100%; margin-top: ${token.marginXS}px;`}
          >
            Add KPI Card
          </Button>
        </div>
      )}

      {/* Query Results Preview configuration */}
      {widget.type === 'query-results-preview' && (
        <>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Query name
            </Text>
            <Input
              value={localConfig.queryName || ''}
              onChange={(e) => setLocalConfig({ ...localConfig, queryName: e.target.value })}
              placeholder="Select a query"
            />
          </div>
          <div css={css`margin-bottom: ${token.marginMD}px;`}>
            <Text css={css`color: ${token.colorText}; display: block; margin-bottom: ${token.marginXS}px;`}>
              Number of rows
            </Text>
            <InputNumber
              value={localConfig.limit || 10}
              onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
              min={1}
              max={50}
              css={css`width: 100%;`}
            />
          </div>
        </>
      )}

      <Flex justify="flex-end" gap={token.marginSM} css={css`margin-top: ${token.marginMD}px;`}>
        <Button size="small" type="default" onClick={onCancel} style={{ fontSize: '12px', background: 'rgba(32, 167, 201, 0.1)', borderColor: 'rgba(32, 167, 201, 0.3)' }}>Cancel</Button>
        <Button size="small" type="primary" onClick={handleSave} style={{ fontSize: '12px' }}>Save</Button>
      </Flex>
    </div>
  );
}
