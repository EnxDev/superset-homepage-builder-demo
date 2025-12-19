/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Row, Col, Card, Flex, Typography, theme } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_PINNED_DASHBOARDS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const PinnedDashboardsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <Row gutter={[token.marginSM, token.marginSM]} css={css`flex-wrap: wrap;`}>
      {MOCK_PINNED_DASHBOARDS.slice(0, config.limit || 4).map((d) => (
        <Col flex="1 1 200px" key={d.id}>
          <Card hoverable css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
            <Flex align="center" gap={token.marginXS}><PushpinOutlined css={css`color: ${token.colorPrimary};`} /><Text strong css={css`color: ${token.colorText}; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`}>{d.name}</Text></Flex>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block; margin-top: ${token.marginXS}px;`}>{d.owner} · {d.views} views</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
