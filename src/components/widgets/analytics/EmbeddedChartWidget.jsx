/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Typography, theme } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';

const { Text } = Typography;
const { useToken } = theme;

export const EmbeddedChartWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div css={css`background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadiusLG}px; padding: ${token.paddingLG}px; height: ${config.height || 300}px; display: flex; flex-direction: column; align-items: center; justify-content: center;`}>
      <LineChartOutlined css={css`font-size: 48px; color: ${token.colorPrimary}; margin-bottom: ${token.marginMD}px;`} />
      <Text css={css`color: ${token.colorTextSecondary};`}>{config.chartName || 'Select a chart to embed'}</Text>
      {!config.chartId && <Button type="primary" size="small" css={css`margin-top: ${token.marginMD}px;`}>Select Chart</Button>}
    </div>
  );
};
