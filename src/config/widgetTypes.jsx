import {
  SmileOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  LinkOutlined,
  LineChartOutlined,
  FundOutlined,
  AlertOutlined,
  TableOutlined,
  NotificationOutlined,
  HistoryOutlined,
  TeamOutlined,
  PushpinOutlined,
  SearchOutlined,
  TagOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  BulbOutlined,
  RobotOutlined,
} from '@ant-design/icons';

// Widget definitions
export const WIDGET_TYPES = {
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

// Category display names
export const CATEGORY_NAMES = {
  data: 'Data',
  analytics: 'Analytics',
  content: 'Content',
  communication: 'Communication',
  navigation: 'Navigation',
  organization: 'Organization',
  ai: 'AI-Powered'
};
