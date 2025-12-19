/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Row, Col, Card, Flex, Segmented, Typography, theme } from 'antd';
import { DashboardOutlined, BarChartOutlined, DatabaseOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_CERTIFICATIONS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const CertificationsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();
  const [filter, setFilter] = useState(config.filter || 'all');

  const getTypeIcon = (t) => t === 'dashboard' ? <DashboardOutlined /> : t === 'chart' ? <BarChartOutlined /> : <DatabaseOutlined />;

  return (
    <div>
      <Segmented value={filter} onChange={setFilter} options={[{ label: 'All', value: 'all' }, { label: 'Dashboards', value: 'dashboard' }, { label: 'Datasets', value: 'dataset' }, { label: 'Charts', value: 'chart' }]} style={{ background: isDarkMode ? '#262B31' : '#E8E8E8' }} css={css`margin-bottom: ${token.marginMD}px;`} />
      <Row gutter={[token.marginSM, token.marginSM]} css={css`flex-wrap: wrap;`}>
        {MOCK_CERTIFICATIONS.filter(c => filter === 'all' || c.type === filter).slice(0, config.limit || 6).map((c) => (
          <Col flex="1 1 200px" key={c.id}>
            <Card css={css`background: ${isDarkMode ? '#363D44' : '#FFFFFF'}; border: 1px solid ${token.colorBorder};`} styles={{ body: { padding: token.paddingSM } }}>
              <Flex align="center" gap={token.marginXS}><SafetyCertificateOutlined css={css`color: ${token.colorSuccess};`} /><Text strong css={css`color: ${token.colorText};`}>{c.name}</Text></Flex>
              <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px; display: block;`}>{c.description}</Text>
              <Flex align="center" gap={token.marginXS} css={css`margin-top: ${token.marginXS}px;`}>{getTypeIcon(c.type)}<Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>Certified by {c.certifiedBy}</Text></Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
