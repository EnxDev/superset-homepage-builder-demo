/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Tag, Typography, theme } from 'antd';
import { useDarkMode } from '../../../context';
import { MOCK_CHANGELOG } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const ChangelogWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      {MOCK_CHANGELOG.slice(0, config.limit || 3).map((entry) => (
        <div key={entry.id} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginSM}px;`}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={token.marginXS}><Tag color="blue">{entry.version}</Tag><Text strong css={css`color: ${token.colorText};`}>{entry.title}</Text></Flex>
            <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{entry.date}</Text>
          </Flex>
          <ul css={css`margin: ${token.marginXS}px 0 0 ${token.marginMD}px; padding: 0; color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>
            {entry.changes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};
