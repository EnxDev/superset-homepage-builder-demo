/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Typography, theme } from 'antd';
import { ExclamationCircleOutlined, WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_DATA_QUALITY_ALERTS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const DataQualityAlertsWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  const getSeverityColor = (s) => s === 'error' ? token.colorError : s === 'warning' ? token.colorWarning : token.colorPrimary;
  const getSeverityIcon = (s) => s === 'error' ? <ExclamationCircleOutlined /> : s === 'warning' ? <WarningOutlined /> : <InfoCircleOutlined />;

  return (
    <div>
      {MOCK_DATA_QUALITY_ALERTS.slice(0, config.limit || 5).map((alert) => (
        <Flex key={alert.id} align="flex-start" gap={token.marginSM} css={css`padding: ${token.paddingSM}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; margin-bottom: ${token.marginXS}px; border-left: 3px solid ${getSeverityColor(alert.severity)};`}>
          <span css={css`color: ${getSeverityColor(alert.severity)}; font-size: ${token.fontSizeLG}px;`}>{getSeverityIcon(alert.severity)}</span>
          <div css={css`flex: 1;`}>
            <Text css={css`color: ${token.colorText}; font-size: ${token.fontSize}px; display: block;`}>{alert.message}</Text>
            <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>{alert.dataset} · {alert.time}</Text>
          </div>
        </Flex>
      ))}
    </div>
  );
};
