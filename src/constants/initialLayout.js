// Initial layout matching Superset homepage
export const INITIAL_LAYOUT = {
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
export const DEFAULT_HOMEPAGES = [
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

// localStorage keys
export const STORAGE_KEYS = {
  layout: 'superset-homepage-layout',
  preferences: 'superset-homepage-preferences',
  savedHomepages: 'superset-saved-homepages'
};
