/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Button, Typography, theme } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';
import { MOCK_QUERY_RESULTS } from '../../../constants';

const { Text } = Typography;
const { useToken } = theme;

export const QueryResultsPreviewWidget = ({ config }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex justify="space-between" align="center" css={css`margin-bottom: ${token.marginMD}px;`}>
        <Text strong css={css`color: ${token.colorText};`}>{config.queryName || 'Top Customers Query'}</Text>
        <Button size="small" icon={<TableOutlined />}>Open in SQL Lab</Button>
      </Flex>
      <div css={css`overflow-x: auto;`}>
        <table css={css`width: 100%; border-collapse: collapse; font-size: ${token.fontSizeSM}px;`}>
          <thead>
            <tr css={css`background: ${isDarkMode ? '#363D44' : '#F5F5F5'};`}>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Customer</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Revenue</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Orders</th>
              <th css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; text-align: left; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorder};`}>Region</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_QUERY_RESULTS.slice(0, config.limit || 5).map((row) => (
              <tr key={row.id} css={css`&:hover { background: ${isDarkMode ? '#3D444D' : '#FAFAFA'}; }`}>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.customer}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.revenue}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.orders}</td>
                <td css={css`padding: ${token.paddingXS}px ${token.paddingSM}px; color: ${token.colorText}; border-bottom: 1px solid ${token.colorBorderSecondary};`}>{row.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
