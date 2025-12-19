/** @jsxImportSource @emotion/react */
import { Typography } from 'antd';

// Import all widget components
import {
  RecentsWidget,
  DashboardsWidget,
  ChartsWidget,
  SavedQueriesWidget,
  WelcomeBannerWidget,
  MarkdownWidget,
  EmbeddedChartWidget,
  KpiCardsWidget,
  DataQualityAlertsWidget,
  QueryResultsPreviewWidget,
  AnnouncementsWidget,
  ChangelogWidget,
  TeamActivityWidget,
  QuickLinksWidget,
  PinnedDashboardsWidget,
  SearchBoxWidget,
  RecentDatabasesWidget,
  TagCloudWidget,
  ReportsScheduleWidget,
  CertificationsWidget,
  AiSuggestionsWidget,
  NaturalLanguageQueryWidget,
} from '../widgets';

const { Text } = Typography;

// Map widget types to their components
const WIDGET_COMPONENTS = {
  'welcome-banner': WelcomeBannerWidget,
  'recents': RecentsWidget,
  'dashboards': DashboardsWidget,
  'charts': ChartsWidget,
  'saved-queries': SavedQueriesWidget,
  'markdown': MarkdownWidget,
  'quick-links': QuickLinksWidget,
  'embedded-chart': EmbeddedChartWidget,
  'kpi-cards': KpiCardsWidget,
  'data-quality-alerts': DataQualityAlertsWidget,
  'query-results-preview': QueryResultsPreviewWidget,
  'announcements': AnnouncementsWidget,
  'changelog': ChangelogWidget,
  'team-activity': TeamActivityWidget,
  'pinned-dashboards': PinnedDashboardsWidget,
  'search-box': SearchBoxWidget,
  'recent-databases': RecentDatabasesWidget,
  'tag-cloud': TagCloudWidget,
  'reports-schedule': ReportsScheduleWidget,
  'certifications': CertificationsWidget,
  'ai-suggestions': AiSuggestionsWidget,
  'natural-language-query': NaturalLanguageQueryWidget,
};

/**
 * Widget Renderer Component
 * Renders the appropriate widget content based on widget type
 */
export const WidgetRenderer = ({ widget, isEditing, onConfigure }) => {
  const WidgetComponent = WIDGET_COMPONENTS[widget.type];

  if (!WidgetComponent) {
    return <Text type="secondary">Unknown widget type: {widget.type}</Text>;
  }

  return (
    <WidgetComponent
      config={widget.config}
      isEditing={isEditing}
      onConfigure={() => onConfigure?.(widget)}
    />
  );
};
