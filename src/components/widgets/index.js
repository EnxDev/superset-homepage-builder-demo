// Data widgets
export { RecentsWidget, DashboardsWidget, ChartsWidget, SavedQueriesWidget } from './data';

// Content widgets
export { WelcomeBannerWidget, MarkdownWidget } from './content';

// Analytics widgets
export { EmbeddedChartWidget, KpiCardsWidget, DataQualityAlertsWidget, QueryResultsPreviewWidget } from './analytics';

// Communication widgets
export { AnnouncementsWidget, ChangelogWidget, TeamActivityWidget } from './communication';

// Navigation widgets
export { QuickLinksWidget, PinnedDashboardsWidget, SearchBoxWidget, RecentDatabasesWidget } from './navigation';

// Organization widgets
export { TagCloudWidget, ReportsScheduleWidget, CertificationsWidget } from './organization';

// AI widgets
export { AiSuggestionsWidget, NaturalLanguageQueryWidget } from './ai';

// Widget content map for rendering
export const WIDGET_CONTENT = {
  'welcome-banner': 'WelcomeBannerWidget',
  'recents': 'RecentsWidget',
  'dashboards': 'DashboardsWidget',
  'charts': 'ChartsWidget',
  'saved-queries': 'SavedQueriesWidget',
  'markdown': 'MarkdownWidget',
  'quick-links': 'QuickLinksWidget',
  'embedded-chart': 'EmbeddedChartWidget',
  'kpi-cards': 'KpiCardsWidget',
  'data-quality-alerts': 'DataQualityAlertsWidget',
  'query-results-preview': 'QueryResultsPreviewWidget',
  'announcements': 'AnnouncementsWidget',
  'changelog': 'ChangelogWidget',
  'team-activity': 'TeamActivityWidget',
  'pinned-dashboards': 'PinnedDashboardsWidget',
  'search-box': 'SearchBoxWidget',
  'recent-databases': 'RecentDatabasesWidget',
  'tag-cloud': 'TagCloudWidget',
  'reports-schedule': 'ReportsScheduleWidget',
  'certifications': 'CertificationsWidget',
  'ai-suggestions': 'AiSuggestionsWidget',
  'natural-language-query': 'NaturalLanguageQueryWidget',
};
