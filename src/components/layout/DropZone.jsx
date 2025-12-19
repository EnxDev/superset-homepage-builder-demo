/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, theme } from 'antd';

const { useToken } = theme;

/**
 * Drop Zone Component for drag and drop functionality
 */
export const DropZone = ({
  isEditing,
  onDragOver,
  onDragLeave,
  onDrop,
  isActive
}) => {
  const { token } = useToken();

  if (!isEditing) return null;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver(e);
  };

  return (
    <Flex
      align="center"
      justify="center"
      onDragOver={handleDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
      css={css`
        height: ${isActive ? 48 : 24}px;
        margin: ${token.marginXS}px 0;
        border: 2px dashed ${isActive ? token.colorPrimary : token.colorBorder};
        border-radius: ${token.borderRadius}px;
        background: ${isActive ? 'rgba(32, 167, 201, 0.15)' : 'rgba(32, 167, 201, 0.05)'};
        transition: all ${token.motionDurationMid};
        &:hover {
          border-color: ${token.colorPrimary};
          background: rgba(32, 167, 201, 0.1);
        }
      `}
    >
      {isActive ? (
        <span css={css`color: ${token.colorPrimary}; font-size: ${token.fontSizeSM}px; font-weight: ${token.fontWeightStrong};`}>
          Drop here
        </span>
      ) : (
        <span css={css`color: ${token.colorTextTertiary}; font-size: ${token.fontSizeSM}px;`}>
          Drop zone
        </span>
      )}
    </Flex>
  );
};
