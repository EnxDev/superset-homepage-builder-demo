/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Button, Typography, theme } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDarkMode } from '../../../context';

const { Text } = Typography;
const { useToken } = theme;

export const WelcomeBannerWidget = ({ config, isEditing, onConfigure }) => {
  const { token } = useToken();
  const isDarkMode = useDarkMode();

  return (
    <div
      css={css`
        background: linear-gradient(135deg, ${isDarkMode ? '#1a3a4a' : '#e6f7fc'} 0%, ${isDarkMode ? '#2d3339' : '#f7f7f7'} 100%);
        border-radius: ${token.borderRadiusLG}px;
        padding: ${token.paddingLG}px ${token.paddingXL}px;
        border: 1px solid ${isDarkMode ? 'rgba(32, 167, 201, 0.3)' : 'rgba(32, 167, 201, 0.2)'};
        position: relative;
      `}
    >
      {isEditing && (
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={onConfigure}
          css={css`
            position: absolute;
            top: ${token.paddingSM}px;
            right: ${token.paddingSM}px;
            color: ${token.colorPrimary};
            background: ${isDarkMode ? 'rgba(32, 167, 201, 0.2)' : 'rgba(32, 167, 201, 0.15)'};
            border-radius: ${token.borderRadius}px;
            &:hover {
              background: ${isDarkMode ? 'rgba(32, 167, 201, 0.3)' : 'rgba(32, 167, 201, 0.25)'};
              color: ${token.colorPrimary};
            }
          `}
        />
      )}
      <Flex align="center" gap={token.marginLG}>
        <img
          src="/em-logo.jpg"
          alt="Logo"
          css={css`
            width: 64px;
            height: 64px;
            border-radius: 50%;
            object-fit: cover;
          `}
        />
        <div>
          <h2 css={css`margin: 0 0 ${token.marginXS}px 0; color: ${token.colorText}; font-size: 24px; font-weight: 600;`}>
            {config.title || 'Welcome to Superset'}
          </h2>
          <Text css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSize}px;`}>
            {config.subtitle || 'Your data exploration platform'}
          </Text>
        </div>
      </Flex>
    </div>
  );
};
