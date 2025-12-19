/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Row, Col, Card, Flex, Typography, theme } from 'antd';
import { useDarkMode } from '../../../context';

const { Text } = Typography;
const { useToken } = theme;

export const KpiCardsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const kpis = config.kpis || [];

  return (
    <Row gutter={[token.marginMD, token.marginMD]} css={css`flex-wrap: wrap;`}>
      {kpis.map((kpi, i) => (
        <Col flex="1 1 150px" key={i}>
          <Card css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingMD } }}>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{kpi.label}</Text>
            <Flex align="baseline" gap={token.marginSM}>
              <span css={css`font-size: 24px; font-weight: 600; color: ${token.colorText};`}>{kpi.value}</span>
              <span css={css`font-size: ${token.fontSizeSM}px; color: ${kpi.trend === 'up' ? token.colorSuccess : token.colorError};`}>{kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}</span>
            </Flex>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
