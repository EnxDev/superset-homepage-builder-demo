/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Tag, Typography, theme } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_RECENT_DATABASES } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const RecentDatabasesWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      {MOCK_RECENT_DATABASES.slice(0, config.limit || 5).map((db) => (
        <Flex key={db.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px; cursor: pointer; &:hover { background: ${isDarkMode ? '#3D444D' : '#E8E8E8'}; }`}>
          <DatabaseOutlined css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`} />
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-weight: 500;`}>{db.name}</Text>
            <Flex align="center" gap={token.marginXS}><Tag css={css`margin: 0;`}>{db.type}</Tag><Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{db.lastUsed}</Text></Flex>
          </div>
          <Tag color={db.status === 'online' ? 'success' : 'default'}>{db.status}</Tag>
        </Flex>
      ))}
    </div>
  );
};
