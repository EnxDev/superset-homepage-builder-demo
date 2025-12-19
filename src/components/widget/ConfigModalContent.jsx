/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Button, Input, InputNumber, Checkbox, Select, Typography, theme } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { useToken } = theme;

/**
 * Config Modal Content Component
 * Renders configuration options based on widget type
 */
export const ConfigModalContent = ({ widget, onSave, onCancel }) => {
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
};
