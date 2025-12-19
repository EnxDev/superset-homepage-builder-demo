// Mock data for demo purposes

export const MOCK_RECENTS = [
  { name: 'FCC New Coder Survey 2018', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: 'COVID Vaccine Dashboard', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: '[ untitled dashboard ]', time: 'Viewed 18 hours ago', type: 'dashboard' },
  { name: 'Sales Dashboard', time: 'Viewed 18 hours ago', type: 'dashboard' },
];

export const MOCK_DASHBOARDS = [
  { name: 'Sales Dashboard', modified: 'Modified 2 minutes ago', status: 'published' },
  { name: '[ untitled dashboard ]', modified: 'Modified 18 hours ago', status: 'draft' },
  { name: '[ untitled dashboard ]', modified: 'Modified 20 hours ago', status: 'draft' },
  { name: 'FCC New Coder Survey...', modified: 'Modified 20 hours ago', status: 'published' },
  { name: 'COVID Vaccine Dashbo...', modified: 'Modified 20 hours ago', status: 'published' },
];

export const MOCK_CHARTS = [
  { name: 'Weekly Threads', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Weekly Messages', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Members per Channel', modified: 'Modified 20 hours ago', type: 'Bar' },
  { name: 'Cross Channel Relation...', modified: 'Modified 20 hours ago', type: 'Area' },
  { name: 'New Members per Month', modified: 'Modified 20 hours ago', type: 'Line' },
];

export const MOCK_QUERIES = [
  { name: 'Top Customers', database: 'Production', modified: '1 day ago' },
  { name: 'Monthly Revenue', database: 'Analytics', modified: '2 days ago' },
  { name: 'User Segments', database: 'Production', modified: '1 week ago' }
];

export const MOCK_DATA_QUALITY_ALERTS = [
  { id: 1, severity: 'error', message: 'Missing values detected in sales_data.revenue column', dataset: 'sales_data', time: '2 hours ago' },
  { id: 2, severity: 'warning', message: 'Schema drift detected in user_events table', dataset: 'user_events', time: '5 hours ago' },
  { id: 3, severity: 'info', message: 'Data freshness check passed for all datasets', dataset: 'all', time: '1 day ago' },
  { id: 4, severity: 'warning', message: 'Duplicate records found in customers table', dataset: 'customers', time: '2 days ago' },
  { id: 5, severity: 'error', message: 'ETL pipeline failed for marketing_campaigns', dataset: 'marketing_campaigns', time: '3 days ago' },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: 1, title: 'Scheduled Maintenance', content: 'System will be down for maintenance on Sunday 2AM-4AM UTC', priority: 'high', date: '2 hours ago', author: 'Admin' },
  { id: 2, title: 'New Feature: AI Suggestions', content: 'Try our new AI-powered dashboard suggestions feature!', priority: 'medium', date: '1 day ago', author: 'Product Team' },
  { id: 3, title: 'Q4 Data Available', content: 'Q4 2024 financial data is now available in the Analytics database', priority: 'low', date: '3 days ago', author: 'Data Team' },
];

export const MOCK_CHANGELOG = [
  { id: 1, version: 'v4.1.0', title: 'Performance Improvements', changes: ['50% faster dashboard loading', 'Optimized SQL Lab queries', 'Reduced memory usage'], date: '1 week ago' },
  { id: 2, version: 'v4.0.5', title: 'Bug Fixes', changes: ['Fixed chart export issue', 'Resolved timezone handling', 'Fixed filter sync'], date: '2 weeks ago' },
  { id: 3, version: 'v4.0.4', title: 'Security Updates', changes: ['Updated dependencies', 'Enhanced authentication', 'Fixed XSS vulnerability'], date: '3 weeks ago' },
];

export const MOCK_TEAM_ACTIVITY = [
  { id: 1, user: 'Alice Chen', action: 'created', item: 'Sales Performance Dashboard', type: 'dashboard', time: '10 minutes ago', avatar: 'A' },
  { id: 2, user: 'Bob Smith', action: 'modified', item: 'Monthly Revenue Chart', type: 'chart', time: '30 minutes ago', avatar: 'B' },
  { id: 3, user: 'Carol Davis', action: 'shared', item: 'Customer Segmentation', type: 'dataset', time: '1 hour ago', avatar: 'C' },
  { id: 4, user: 'David Lee', action: 'commented on', item: 'KPI Dashboard', type: 'dashboard', time: '2 hours ago', avatar: 'D' },
  { id: 5, user: 'Eva Martinez', action: 'ran', item: 'Daily ETL Query', type: 'query', time: '3 hours ago', avatar: 'E' },
];

export const MOCK_PINNED_DASHBOARDS = [
  { id: 1, name: 'Executive Summary', owner: 'Admin', views: 1234, pinned: true },
  { id: 2, name: 'Sales Performance', owner: 'Sales Team', views: 856, pinned: true },
  { id: 3, name: 'Marketing Analytics', owner: 'Marketing', views: 642, pinned: true },
  { id: 4, name: 'Product Metrics', owner: 'Product Team', views: 521, pinned: true },
];

export const MOCK_RECENT_DATABASES = [
  { id: 1, name: 'Production PostgreSQL', type: 'postgresql', lastUsed: '5 minutes ago', status: 'online' },
  { id: 2, name: 'Analytics Snowflake', type: 'snowflake', lastUsed: '1 hour ago', status: 'online' },
  { id: 3, name: 'Data Warehouse', type: 'bigquery', lastUsed: '2 hours ago', status: 'online' },
  { id: 4, name: 'Staging MySQL', type: 'mysql', lastUsed: '1 day ago', status: 'offline' },
];

export const MOCK_TAGS = [
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

export const MOCK_REPORTS_SCHEDULE = [
  { id: 1, name: 'Daily Sales Report', frequency: 'Daily', nextRun: 'Tomorrow 6:00 AM', recipients: 5, status: 'active' },
  { id: 2, name: 'Weekly KPI Summary', frequency: 'Weekly', nextRun: 'Monday 9:00 AM', recipients: 12, status: 'active' },
  { id: 3, name: 'Monthly Executive Report', frequency: 'Monthly', nextRun: 'Jan 1, 2025', recipients: 8, status: 'active' },
  { id: 4, name: 'Quarterly Review', frequency: 'Quarterly', nextRun: 'Apr 1, 2025', recipients: 3, status: 'paused' },
];

export const MOCK_CERTIFICATIONS = [
  { id: 1, name: 'Sales Dashboard', type: 'dashboard', certifiedBy: 'Data Team', certifiedAt: '1 month ago', description: 'Official sales metrics' },
  { id: 2, name: 'Customer Dataset', type: 'dataset', certifiedBy: 'Admin', certifiedAt: '2 months ago', description: 'Verified customer data' },
  { id: 3, name: 'Revenue Chart', type: 'chart', certifiedBy: 'Finance Team', certifiedAt: '3 weeks ago', description: 'Approved revenue visualization' },
  { id: 4, name: 'User Events', type: 'dataset', certifiedBy: 'Analytics', certifiedAt: '1 week ago', description: 'Validated event tracking' },
];

export const MOCK_AI_SUGGESTIONS = [
  { id: 1, title: 'Sales Trend Analysis', description: 'Based on your recent queries, you might be interested in this dashboard', type: 'dashboard', confidence: 92 },
  { id: 2, title: 'Customer Churn Prediction', description: 'New dataset available that matches your analysis patterns', type: 'dataset', confidence: 87 },
  { id: 3, title: 'Revenue Forecast Chart', description: 'Similar users found this chart useful', type: 'chart', confidence: 85 },
  { id: 4, title: 'Marketing ROI Query', description: 'Recommended based on your team\'s activity', type: 'query', confidence: 78 },
];

export const MOCK_QUERY_RESULTS = [
  { id: 1, customer: 'Acme Corp', revenue: '$125,000', orders: 45, region: 'North America' },
  { id: 2, customer: 'TechStart Inc', revenue: '$98,500', orders: 32, region: 'Europe' },
  { id: 3, customer: 'Global Retail', revenue: '$87,200', orders: 28, region: 'Asia Pacific' },
  { id: 4, customer: 'DataDriven LLC', revenue: '$76,800', orders: 24, region: 'North America' },
  { id: 5, customer: 'CloudFirst', revenue: '$65,400', orders: 19, region: 'Europe' },
];
