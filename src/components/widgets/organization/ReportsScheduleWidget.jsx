/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Tag, Typography, theme } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_REPORTS_SCHEDULE } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const ReportsScheduleWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      {MOCK_REPORTS_SCHEDULE.slice(0, config.limit || 5).map((r) => (
        <Flex key={r.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px;`}>
          <CalendarOutlined css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`} />
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-weight: 500;`}>{r.name}</Text>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{r.frequency} · Next: {r.nextRun}</Text>
          </div>
          <Tag color={r.status === 'active' ? 'success' : 'default'}>{r.status}</Tag>
        </Flex>
      ))}
    </div>
  );
};
