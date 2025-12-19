/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Input, Button, Tag, Typography, theme } from 'antd';
import { RobotOutlined, MessageOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';

const { Text } = Typography;
const { useToken } = theme;

export const NaturalLanguageQueryWidget = ({ config }) => {
  const { token } = useToken();
  const [query, setQuery] = useState('');
  const isDarkMode = useDarkMode();

  return (
    <div>
      <Flex align="center" gap={token.marginXS} css={css`margin-bottom: ${token.marginMD}px;`}><RobotOutlined css={css`color: ${token.colorPrimary}; font-size: 20px;`} /><Text css={css`color: ${token.colorText}; font-weight: 500;`}>Ask your data a question</Text><Tag color="purple">AI Beta</Tag></Flex>
      <Input.TextArea value={query} onChange={(e) => setQuery(e.target.value)} placeholder={config.placeholder || 'Ask a question about your data...'} rows={3} css={css`margin-bottom: ${token.marginMD}px;`} />
      <Flex justify="space-between" align="center">
        <Text css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>Try: "What was total revenue last month?"</Text>
        <Button type="primary" icon={<MessageOutlined />}>Ask AI</Button>
      </Flex>
      {query && <div css={css`margin-top: ${token.marginMD}px; padding: ${token.paddingMD}px; background: ${isDarkMode ? '#363D44' : '#F5F5F5'}; border-radius: ${token.borderRadius}px; border-left: 3px solid ${token.colorPrimary};`}><Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`}>AI is analyzing your query...</Text></div>}
    </div>
  );
};
