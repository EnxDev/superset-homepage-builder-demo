// Data elements
export { RecentsElement, DashboardsElement, ChartsElement, SavedQueriesElement } from './data';

// Content elements
export { WelcomeBannerElement, MarkdownElement } from './content';

// Analytics elements
export { EmbeddedChartElement, KpiCardsElement, DataQualityAlertsElement, QueryResultsPreviewElement } from './analytics';

// Communication elements
export { AnnouncementsElement, ChangelogElement, TeamActivityElement } from './communication';

// Navigation elements
export { QuickLinksElement, PinnedDashboardsElement, SearchBoxElement, RecentDatabasesElement } from './navigation';

// Organization elements
export { TagCloudElement, ReportsScheduleElement, CertificationsElement } from './organization';

// AI elements
export { AiSuggestionsElement, NaturalLanguageQueryElement } from './ai';

// Element content map for rendering
export const ELEMENT_CONTENT = {
  'welcome-banner': 'WelcomeBannerElement',
  'recents': 'RecentsElement',
  'dashboards': 'DashboardsElement',
  'charts': 'ChartsElement',
  'saved-queries': 'SavedQueriesElement',
  'markdown': 'MarkdownElement',
  'quick-links': 'QuickLinksElement',
  'embedded-chart': 'EmbeddedChartElement',
  'kpi-cards': 'KpiCardsElement',
  'data-quality-alerts': 'DataQualityAlertsElement',
  'query-results-preview': 'QueryResultsPreviewElement',
  'announcements': 'AnnouncementsElement',
  'changelog': 'ChangelogElement',
  'team-activity': 'TeamActivityElement',
  'pinned-dashboards': 'PinnedDashboardsElement',
  'search-box': 'SearchBoxElement',
  'recent-databases': 'RecentDatabasesElement',
  'tag-cloud': 'TagCloudElement',
  'reports-schedule': 'ReportsScheduleElement',
  'certifications': 'CertificationsElement',
  'ai-suggestions': 'AiSuggestionsElement',
  'natural-language-query': 'NaturalLanguageQueryElement',
};
