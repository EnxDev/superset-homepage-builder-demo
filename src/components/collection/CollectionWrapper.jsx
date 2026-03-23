/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Space, Button, Typography, theme } from 'antd';
import {
  SettingOutlined,
  CloseOutlined,
  HolderOutlined,
  RightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { COLLECTION_TYPES } from '../../config';

const { Text } = Typography;
const { useToken } = theme;

/**
 * Collection Wrapper Component (formerly SectionElement)
 * Wraps collection content with header, drag handle, and controls
 */
export const CollectionWrapper = ({
  collection,
  isEditing,
  onRemove,
  onConfigure,
  onToggleCollapse,
  onDragStart,
  isDragging,
  children
}) => {
  const collectionDef = COLLECTION_TYPES[collection.type];
  const isCollapsed = collection.collapsed;
  const { token } = useToken();

  return (
    <div
      draggable={isEditing}
      onDragStart={(e) => onDragStart(e, collection)}
      css={css`
        opacity: ${isDragging ? 0.5 : 1};
        margin-bottom: ${token.marginXS}px;
        border: ${isEditing ? `1px dashed ${token.colorBorder}` : 'none'};
        border-radius: ${token.borderRadiusLG}px;
        padding: ${isEditing ? token.paddingXS : 0}px;
        background: ${isEditing ? token.colorFillQuaternary : 'transparent'};
        transition: all ${token.motionDurationMid};
      `}
    >
      <Flex
        align="center"
        gap={token.marginXS}
        css={css`
          padding: ${isEditing ? `${token.paddingXS}px` : `${token.paddingXS}px 0`};
          cursor: pointer;
          border-radius: ${token.borderRadiusSM}px;
          &:hover {
            background: ${isEditing ? token.colorFillTertiary : 'transparent'};
          }
        `}
        onClick={() => onToggleCollapse(collection.id)}
      >
        {isEditing && <HolderOutlined css={css`color: ${token.colorTextTertiary}; cursor: grab;`} />}
        {isCollapsed ? (
          <RightOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`} />
        ) : (
          <DownOutlined css={css`color: ${token.colorTextSecondary}; font-size: ${token.fontSizeSM}px;`} />
        )}
        <span css={css`color: ${token.colorText}; font-weight: ${token.fontWeightStrong}; font-size: ${token.fontSize}px;`}>
          {collectionDef?.name || collection.type}
        </span>

        {isEditing && (
          <Space css={css`margin-left: auto;`}>
            <Button
              type="text"
              size="small"
              icon={<SettingOutlined css={css`color: ${token.colorTextSecondary};`} />}
              onClick={(e) => { e.stopPropagation(); onConfigure(collection); }}
            />
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined css={css`color: ${token.colorError};`} />}
              onClick={(e) => { e.stopPropagation(); onRemove(collection.id); }}
            />
          </Space>
        )}
      </Flex>

      {!isCollapsed && (
        <div css={css`margin-top: ${token.marginXS}px; margin-bottom: ${token.marginLG}px;`}>
          {children || <Text type="secondary">Collection content</Text>}
        </div>
      )}
    </div>
  );
};
