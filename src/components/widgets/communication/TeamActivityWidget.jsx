/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Typography, theme } from 'antd';
import { DashboardOutlined, BarChartOutlined, DatabaseOutlined, TableOutlined } from '@ant-design/icons';
import { MOCK_TEAM_ACTIVITY } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const TeamActivityWidget = ({ config }) => {
  const { token } = useToken();

  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : t === 'dataset' ? <DatabaseOutlined /> : <TableOutlined />;

  return (
    <div>
      {MOCK_TEAM_ACTIVITY.slice(0, config.limit || 5).map((a) => (
        <Flex key={a.id} align="center" gap={token.marginSM} css={css`padding: ${token.paddingXS}px 0; border-bottom: 1px solid ${token.colorBorderSecondary}; &:last-child { border-bottom: none; }`}>
          <div css={css`width: 32px; height: 32px; border-radius: 50%; background: ${token.colorPrimary}; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: ${token.fontSizeSM}px;`}>{a.avatar}</div>
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-size: ${token.fontSize}px;`}><strong>{a.user}</strong> {a.action} <span css={css`color: ${token.colorPrimary};`}>{a.item}</span></Text>
            <Flex align="center" gap={token.marginXS}><span css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{getTypeIcon(a.type)}</span><Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>{a.time}</Text></Flex>
          </div>
        </Flex>
      ))}
    </div>
  );
};
