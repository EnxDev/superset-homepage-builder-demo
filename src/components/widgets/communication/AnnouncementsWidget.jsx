/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Card, Typography, theme } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_ANNOUNCEMENTS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const AnnouncementsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  const getPriorityColor = (p) => p === 'high' ? token.colorError : p === 'medium' ? token.colorWarning : token.colorPrimary;

  return (
    <div>
      {MOCK_ANNOUNCEMENTS.slice(0, config.limit || 3).map((a) => (
        <Card key={a.id} css={css`margin-bottom: ${token.marginSM}px; background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder}; border-left: 3px solid ${getPriorityColor(a.priority)};`} styles={{ body: { padding: token.paddingSM } }}>
          <Flex align="center" gap={token.marginXS}>
            <NotificationOutlined css={css`color: ${getPriorityColor(a.priority)};`} />
            <Text strong css={css`color: ${token.colorText};`}>{a.title}</Text>
          </Flex>
          <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{a.content}</Text>
          <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{a.author} · {a.date}</Text>
        </Card>
      ))}
    </div>
  );
};
