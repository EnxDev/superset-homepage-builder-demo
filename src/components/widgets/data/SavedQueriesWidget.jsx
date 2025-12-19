/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Space, Segmented, Button, theme } from 'antd';
import { PlusOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_QUERIES } from '../../../constants';

const { useToken } = theme;

export const SavedQueriesWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Segmented value="mine" options={[{ label: 'Mine', value: 'mine' }]} style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }} />
        <Space>
          <Button size="small" icon={<PlusOutlined />}>SQL Query</Button>
          <a css={css`color: ${token.colorPrimary}; font-size: ${token.fontSize}px;`}>View All »</a>
        </Space>
      </Flex>
      <div>
        {MOCK_QUERIES.slice(0, config.limit || 5).map((q, i) => (
          <Flex
            key={i}
            align="center"
            gap={token.marginSM}
            css={css`
              padding: ${token.paddingSM}px;
              background: ${token.colorBorderSecondary};
              border-radius: ${token.borderRadiusLG}px;
              cursor: pointer;
              margin-bottom: ${token.marginXS}px;
              transition: background ${token.motionDurationMid};
              &:hover {
                background: ${token.colorBorder};
              }
            `}
          >
            <DatabaseOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeLG}px;`} />
            <div css={css`flex: 1; min-width: 0;`}>
              <span
                css={css`
                  color: ${token.colorText};
                  font-weight: ${token.fontWeightStrong};
                  display: block;
                  font-size: ${token.fontSize}px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {q.name}
              </span>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${token.colorTextSecondary};`}>
                {q.database} · {q.modified}
              </span>
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
};
