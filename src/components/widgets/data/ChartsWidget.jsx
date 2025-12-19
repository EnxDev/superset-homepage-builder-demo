/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Space, Segmented, Row, Col, Card, Button, theme } from 'antd';
import { PlusOutlined, StarOutlined, MoreOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_CHARTS } from '../../../constants';

const { useToken } = theme;

export const ChartsWidget = ({ config }) => {
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
          <Button size="small" icon={<PlusOutlined />}>Chart</Button>
          <a css={css`color: ${token.colorPrimary}; font-size: ${token.fontSize}px;`}>View All »</a>
        </Space>
      </Flex>
      <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
        {MOCK_CHARTS.slice(0, config.limit || 5).map((c, i) => (
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
                  justify="center"
                  css={css`
                    height: 128px;
                    background: ${token.colorBorderSecondary};
                    padding: ${token.paddingSM}px;
                  `}
                >
                  <Flex align="flex-end" css={css`height: 80px;`}>
                    {[40, 60, 35, 70, 50].map((h, j) => (
                      <div
                        key={j}
                        css={css`
                          width: 12px;
                          height: ${h}%;
                          background: ${token.colorTextQuaternary};
                          border-radius: ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0 0;
                          margin-left: ${token.marginXS}px;
                        `}
                      />
                    ))}
                  </Flex>
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
                  {c.name}
                </span>
                <Space size={4}>
                  <StarOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                  <MoreOutlined css={css`color: ${token.colorTextTertiary}; cursor: pointer;`} />
                </Space>
              </Flex>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                {c.modified}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
