/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Card, Tag, Typography, theme } from 'antd';
import { DashboardOutlined, BarChartOutlined, DatabaseOutlined, TableOutlined, RobotOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_AI_SUGGESTIONS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const AiSuggestionsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : t === 'dataset' ? <DatabaseOutlined /> : <TableOutlined />;

  return (
    <div>
      <Flex align="center" gap={token.marginXS} css={css`margin-bottom: ${token.marginMD}px;`}><RobotOutlined css={css`color: ${token.colorPrimary};`} /><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>Personalized recommendations based on your activity</Text></Flex>
      {MOCK_AI_SUGGESTIONS.slice(0, config.limit || 4).map((s) => (
        <Card key={s.id} hoverable css={css`margin-bottom: ${token.marginSM}px; background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
          <Flex justify="space-between" align="flex-start">
            <Flex align="center" gap={token.marginSM}><span css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeLG}px;`}>{getTypeIcon(s.type)}</span><div><Text strong css={css`color: ${token.colorText};`}>{s.title}</Text><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{s.description}</Text></div></Flex>
            <Tag color="blue">{s.confidence}% match</Tag>
          </Flex>
        </Card>
      ))}
    </div>
  );
};
