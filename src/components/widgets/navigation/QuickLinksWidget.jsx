/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Space, theme } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { useToken } = theme;

export const QuickLinksWidget = ({ config }) => {
  const { token } = useToken();
  const links = config.links || [
    { title: 'Documentation', url: '#' },
    { title: 'SQL Lab', url: '#' },
    { title: 'Create Dashboard', url: '#' }
  ];

  return (
    <Space direction="vertical" css={css`width: 100%;`}>
      {links.map((link, i) => (
        <a key={i} href={link.url} css={css`color: ${token.colorPrimary}; display: flex; align-items: center; gap: 8px;`}>
          <LinkOutlined /> {link.title}
        </a>
      ))}
    </Space>
  );
};
