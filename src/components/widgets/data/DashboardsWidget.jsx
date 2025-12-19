/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Space, Segmented, Row, Col, Card, Button, Tag, theme } from 'antd';
import { PlusOutlined, StarOutlined, MoreOutlined, SyncOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_DASHBOARDS } from '../../../constants';

const { useToken } = theme;

export const DashboardsWidget = ({ config }) => {
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
