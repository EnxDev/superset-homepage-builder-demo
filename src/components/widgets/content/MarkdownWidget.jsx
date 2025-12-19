/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from 'antd';

const { useToken } = theme;

export const MarkdownWidget = ({ config }) => {
  const { token } = useToken();

  return (
    <div css={css`color: ${token.colorText};`}>
      <div dangerouslySetInnerHTML={{ __html: config.content?.replace(/##\s/g, '<h2>').replace(/\n/g, '<br/>') || 'No content' }} />
    </div>
  );
};
