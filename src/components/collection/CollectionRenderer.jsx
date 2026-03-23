/** @jsxImportSource @emotion/react */
import { Typography } from 'antd';

// Import all element components
import {
  RecentsElement,
  DashboardsElement,
  ChartsElement,
  SavedQueriesElement,
  WelcomeBannerElement,
  MarkdownElement,
  EmbeddedChartElement,
  KpiCardsElement,
  DataQualityAlertsElement,
  QueryResultsPreviewElement,
  AnnouncementsElement,
  ChangelogElement,
  TeamActivityElement,
  QuickLinksElement,
  PinnedDashboardsElement,
  SearchBoxElement,
  RecentDatabasesElement,
  TagCloudElement,
  ReportsScheduleElement,
  CertificationsElement,
  AiSuggestionsElement,
  NaturalLanguageQueryElement,
} from '../elements';

const { Text } = Typography;

// Map collection types to their components
const ELEMENT_COMPONENTS = {
  'welcome-banner': WelcomeBannerElement,
  'recents': RecentsElement,
  'dashboards': DashboardsElement,
  'charts': ChartsElement,
  'saved-queries': SavedQueriesElement,
  'markdown': MarkdownElement,
  'quick-links': QuickLinksElement,
  'embedded-chart': EmbeddedChartElement,
  'kpi-cards': KpiCardsElement,
  'data-quality-alerts': DataQualityAlertsElement,
  'query-results-preview': QueryResultsPreviewElement,
  'announcements': AnnouncementsElement,
  'changelog': ChangelogElement,
  'team-activity': TeamActivityElement,
  'pinned-dashboards': PinnedDashboardsElement,
  'search-box': SearchBoxElement,
  'recent-databases': RecentDatabasesElement,
  'tag-cloud': TagCloudElement,
  'reports-schedule': ReportsScheduleElement,
  'certifications': CertificationsElement,
  'ai-suggestions': AiSuggestionsElement,
  'natural-language-query': NaturalLanguageQueryElement,
};

/**
 * Collection Renderer Component
 * Renders the appropriate collection content based on collection type
 */
export const CollectionRenderer = ({ collection, isEditing, onConfigure }) => {
  const ElementComponent = ELEMENT_COMPONENTS[collection.type];

  if (!ElementComponent) {
    return <Text type="secondary">Unknown collection type: {collection.type}</Text>;
  }

  return (
    <ElementComponent
      config={collection.config}
      isEditing={isEditing}
      onConfigure={() => onConfigure?.(collection)}
    />
  );
};
