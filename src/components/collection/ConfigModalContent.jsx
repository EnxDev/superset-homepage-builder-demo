/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Button, Input, InputNumber, Checkbox, Select, Typography, Divider, theme } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { COLLECTION_TYPES } from '../../config';

const { Text } = Typography;
const { useToken } = theme;

// --- Reusable field components ---

const FieldLabel = ({ token, children, description }) => (
  <div css={css`margin-bottom: ${token.marginXS}px;`}>
    <Text css={css`color: ${token.colorText}; display: block; font-weight: 500;`}>
      {children}
    </Text>
    {description && (
      <Text css={css`color: ${token.colorTextTertiary}; display: block; font-size: ${token.fontSizeSM}px;`}>
        {description}
      </Text>
    )}
  </div>
);

const Field = ({ token, label, description, children }) => (
  <div css={css`margin-bottom: ${token.marginMD}px;`}>
    <FieldLabel token={token} description={description}>{label}</FieldLabel>
    {children}
  </div>
);

const LimitField = ({ token, value, onChange, min = 1, max = 20, defaultVal = 5, description }) => (
  <Field token={token} label="Number of items" description={description}>
    <InputNumber
      value={value || defaultVal}
      onChange={onChange}
      min={min}
      max={max}
      css={css`width: 100%;`}
    />
  </Field>
);

const FilterField = ({ token, value, onChange, options, label = 'Default filter', description }) => (
  <Field token={token} label={label} description={description}>
    <Select
      value={value}
      onChange={onChange}
      options={options}
      css={css`width: 100%;`}
    />
  </Field>
);

// --- Type-specific config renderers ---

const configRenderers = {
  // === DATA ===
  'dashboards': ({ localConfig, setLocalConfig, token }) => (
    <>
      <LimitField
        token={token}
        value={localConfig.limit}
        onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
        min={1}
        max={12}
        defaultVal={5}
        description="How many dashboards to display"
      />
      <FilterField
        token={token}
        value={localConfig.filter || 'all'}
        onChange={(value) => setLocalConfig({ ...localConfig, filter: value })}
        options={[
          { label: 'All dashboards', value: 'all' },
          { label: 'My dashboards', value: 'mine' },
          { label: 'Favorites', value: 'favorite' },
        ]}
        description="Which dashboards to show by default"
      />
      <Checkbox
        checked={localConfig.showThumbnails}
        onChange={(e) => setLocalConfig({ ...localConfig, showThumbnails: e.target.checked })}
      >
        <Text css={css`color: ${token.colorText};`}>Show thumbnails</Text>
      </Checkbox>
    </>
  ),

  'charts': ({ localConfig, setLocalConfig, token }) => (
    <>
      <LimitField
        token={token}
        value={localConfig.limit}
        onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
        min={1}
        max={12}
        defaultVal={5}
        description="How many charts to display"
      />
      <FilterField
        token={token}
        value={localConfig.filter || 'all'}
        onChange={(value) => setLocalConfig({ ...localConfig, filter: value })}
        options={[
          { label: 'All charts', value: 'all' },
          { label: 'My charts', value: 'mine' },
          { label: 'Favorites', value: 'favorite' },
        ]}
        description="Which charts to show by default"
      />
      <Checkbox
        checked={localConfig.showThumbnails}
        onChange={(e) => setLocalConfig({ ...localConfig, showThumbnails: e.target.checked })}
      >
        <Text css={css`color: ${token.colorText};`}>Show thumbnails</Text>
      </Checkbox>
    </>
  ),

  'recents': ({ localConfig, setLocalConfig, token }) => (
    <>
      <LimitField
        token={token}
        value={localConfig.limit}
        onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
        min={1}
        max={8}
        defaultVal={4}
        description="How many recent items to display"
      />
      <FilterField
        token={token}
        value={localConfig.filter || 'viewed'}
        onChange={(value) => setLocalConfig({ ...localConfig, filter: value })}
        options={[
          { label: 'Recently viewed', value: 'viewed' },
          { label: 'Recently edited', value: 'edited' },
          { label: 'Recently created', value: 'created' },
        ]}
        description="Which tab to show by default"
      />
    </>
  ),

  'saved-queries': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={10}
      defaultVal={5}
      description="How many saved queries to display"
    />
  ),

  // === CONTENT ===
  'welcome-banner': ({ localConfig, setLocalConfig, token }) => (
    <>
      <Field token={token} label="Title" description="Main heading shown on the banner">
        <Input
          value={localConfig.title || ''}
          onChange={(e) => setLocalConfig({ ...localConfig, title: e.target.value })}
          placeholder="Welcome to Superset"
        />
      </Field>
      <Field token={token} label="Subtitle" description="Supporting text below the title">
        <Input
          value={localConfig.subtitle || ''}
          onChange={(e) => setLocalConfig({ ...localConfig, subtitle: e.target.value })}
          placeholder="Your data exploration platform"
        />
      </Field>
    </>
  ),

  'markdown': ({ localConfig, setLocalConfig, token }) => (
    <Field token={token} label="Content" description="Supports GitHub-flavored Markdown syntax">
      <Input.TextArea
        value={localConfig.content || ''}
        onChange={(e) => setLocalConfig({ ...localConfig, content: e.target.value })}
        rows={8}
        placeholder="## My Content&#10;&#10;Write your markdown here..."
      />
    </Field>
  ),

  // === NAVIGATION ===
  'search-box': ({ localConfig, setLocalConfig, token }) => (
    <Field token={token} label="Placeholder text" description="Hint text shown when the search box is empty">
      <Input
        value={localConfig.placeholder || ''}
        onChange={(e) => setLocalConfig({ ...localConfig, placeholder: e.target.value })}
        placeholder="Search dashboards, charts, datasets..."
      />
    </Field>
  ),

  'quick-links': ({ localConfig, setLocalConfig, token }) => (
    <Field token={token} label="Links" description="Add shortcuts to frequently used pages">
      <>
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
            <Select
              value={link.icon || 'link'}
              onChange={(value) => {
                const newLinks = [...(localConfig.links || [])];
                newLinks[index] = { ...newLinks[index], icon: value };
                setLocalConfig({ ...localConfig, links: newLinks });
              }}
              options={[
                { label: 'Link', value: 'link' },
                { label: 'File', value: 'file' },
                { label: 'Database', value: 'database' },
                { label: 'Dashboard', value: 'dashboard' },
                { label: 'Chart', value: 'chart' },
                { label: 'History', value: 'history' },
              ]}
              css={css`width: 110px;`}
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
      </>
    </Field>
  ),

  'pinned-dashboards': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={12}
      defaultVal={4}
      description="How many pinned dashboards to show"
    />
  ),

  'recent-databases': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={10}
      defaultVal={5}
      description="How many recent databases to show"
    />
  ),

  // === ANALYTICS ===
  'embedded-chart': ({ localConfig, setLocalConfig, token }) => (
    <>
      <Field token={token} label="Chart name" description="Name of the chart to embed">
        <Input
          value={localConfig.chartName || ''}
          onChange={(e) => setLocalConfig({ ...localConfig, chartName: e.target.value })}
          placeholder="Select a chart"
        />
      </Field>
      <Field token={token} label="Height (px)" description="Display height of the embedded chart">
        <InputNumber
          value={localConfig.height || 300}
          onChange={(value) => setLocalConfig({ ...localConfig, height: value })}
          min={100}
          max={800}
          step={50}
          css={css`width: 100%;`}
          addonAfter="px"
        />
      </Field>
    </>
  ),

  'kpi-cards': ({ localConfig, setLocalConfig, token }) => (
    <Field token={token} label="KPI Cards" description="Configure metrics displayed as cards">
      <>
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
                placeholder="Label (e.g. Revenue)"
                css={css`flex: 1;`}
              />
              <Input
                value={kpi.value}
                onChange={(e) => {
                  const newKpis = [...(localConfig.kpis || [])];
                  newKpis[index] = { ...newKpis[index], value: e.target.value };
                  setLocalConfig({ ...localConfig, kpis: newKpis });
                }}
                placeholder="Value (e.g. $1.2M)"
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
                  { label: 'Trending up', value: 'up' },
                  { label: 'Trending down', value: 'down' }
                ]}
                css={css`width: 140px;`}
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
      </>
    </Field>
  ),

  'data-quality-alerts': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={20}
      defaultVal={5}
      description="How many alerts to display"
    />
  ),

  'query-results-preview': ({ localConfig, setLocalConfig, token }) => (
    <>
      <Field token={token} label="Query name" description="Name of the saved query to preview">
        <Input
          value={localConfig.queryName || ''}
          onChange={(e) => setLocalConfig({ ...localConfig, queryName: e.target.value })}
          placeholder="Select a query"
        />
      </Field>
      <LimitField
        token={token}
        value={localConfig.limit}
        onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
        min={1}
        max={50}
        defaultVal={10}
        description="Number of result rows to preview"
      />
    </>
  ),

  // === COMMUNICATION ===
  'announcements': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={10}
      defaultVal={3}
      description="How many announcements to display"
    />
  ),

  'changelog': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={10}
      defaultVal={5}
      description="How many changelog entries to show"
    />
  ),

  'team-activity': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={15}
      defaultVal={5}
      description="How many activity items to show"
    />
  ),

  // === ORGANIZATION ===
  'tag-cloud': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={5}
      max={50}
      defaultVal={20}
      description="Maximum number of tags to display"
    />
  ),

  'reports-schedule': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={10}
      defaultVal={5}
      description="How many scheduled reports to show"
    />
  ),

  'certifications': ({ localConfig, setLocalConfig, token }) => (
    <>
      <LimitField
        token={token}
        value={localConfig.limit}
        onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
        min={1}
        max={12}
        defaultVal={6}
        description="How many certifications to display"
      />
      <FilterField
        token={token}
        value={localConfig.filter || 'all'}
        onChange={(value) => setLocalConfig({ ...localConfig, filter: value })}
        options={[
          { label: 'All types', value: 'all' },
          { label: 'Dashboards', value: 'dashboard' },
          { label: 'Datasets', value: 'dataset' },
          { label: 'Charts', value: 'chart' },
        ]}
        description="Which certification type to show by default"
      />
    </>
  ),

  // === AI ===
  'ai-suggestions': ({ localConfig, setLocalConfig, token }) => (
    <LimitField
      token={token}
      value={localConfig.limit}
      onChange={(value) => setLocalConfig({ ...localConfig, limit: value })}
      min={1}
      max={8}
      defaultVal={4}
      description="How many AI suggestions to display"
    />
  ),

  'natural-language-query': ({ localConfig, setLocalConfig, token }) => (
    <Field token={token} label="Placeholder text" description="Hint text shown in the query input">
      <Input
        value={localConfig.placeholder || ''}
        onChange={(e) => setLocalConfig({ ...localConfig, placeholder: e.target.value })}
        placeholder="Ask a question about your data..."
      />
    </Field>
  ),
};

/**
 * Config Modal Content Component
 * Renders type-specific configuration controls for each element
 */
export const ConfigModalContent = ({ collection, onSave, onCancel }) => {
  const [localConfig, setLocalConfig] = useState(collection.config);
  const { token } = useToken();

  const handleSave = () => {
    onSave({ ...collection, config: localConfig });
  };

  const typeDef = COLLECTION_TYPES[collection.type];
  const Renderer = configRenderers[collection.type];

  return (
    <div>
      {/* Type info header */}
      {typeDef && (
        <Flex align="center" gap={token.marginXS} css={css`margin-bottom: ${token.marginMD}px; padding-bottom: ${token.paddingSM}px; border-bottom: 1px solid ${token.colorBorderSecondary};`}>
          <span css={css`color: ${token.colorPrimary}; font-size: 16px;`}>{typeDef.icon}</span>
          <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>
            {typeDef.name}
          </Text>
        </Flex>
      )}

      {Renderer ? (
        <Renderer localConfig={localConfig} setLocalConfig={setLocalConfig} token={token} />
      ) : (
        <Text type="secondary">No configuration options for this element.</Text>
      )}

      <Divider css={css`margin: ${token.marginMD}px 0 ${token.marginSM}px;`} />

      <Flex justify="flex-end" gap={token.marginSM}>
        <Button size="small" type="default" onClick={onCancel} style={{ fontSize: '12px', background: 'rgba(32, 167, 201, 0.1)', borderColor: 'rgba(32, 167, 201, 0.3)' }}>Cancel</Button>
        <Button size="small" type="primary" onClick={handleSave} style={{ fontSize: '12px' }}>Save</Button>
      </Flex>
    </div>
  );
};
