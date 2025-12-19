/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Space, Segmented, Row, Col, theme } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_RECENTS } from '../../../constants';

const { useToken } = theme;

export const RecentsWidget = ({ config }) => {
  const [filter, setFilter] = useState(config.filter || 'viewed');
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Space css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Viewed', value: 'viewed' },
            { label: 'Edited', value: 'edited' },
            { label: 'Created', value: 'created' },
          ]}
          style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }}
        />
      </Space>
      <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
        {MOCK_RECENTS.slice(0, config.limit || 4).map((item, i) => (
          <Col flex="1 1 200px" key={i}>
            <div
              css={css`
                background: ${isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'};
                border-radius: ${token.borderRadiusLG}px;
                padding: ${token.paddingMD}px;
                cursor: pointer;
                transition: background ${token.motionDurationMid};
                &:hover {
                  background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
                }
              `}
            >
              <Space>
                <SyncOutlined css={css`color: ${token.colorTextSecondary};`} />
                <span
                  css={css`
                    color: ${token.colorText};
                    font-weight: ${token.fontWeightStrong};
                    font-size: ${token.fontSize}px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}
                >
                  {item.name}
                </span>
              </Space>
              <div css={css`margin-top: ${token.marginXS}px;`}>
                <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                  {item.time}
                </span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
