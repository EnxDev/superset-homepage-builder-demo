/** @jsxImportSource @emotion/react */
import { useState, useCallback } from 'react';
import { css } from '@emotion/react';
import {
  Drawer,
  Button,
  Input,
  Select,
  Tag,
  Typography,
  Space,
  Flex,
  Popconfirm,
  theme,
} from 'antd';
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { TEMPLATE_CATEGORIES } from '../../constants';

const { Text } = Typography;
const { useToken } = theme;

const TemplateCard = ({
  homepage,
  isActive,
  isPreset,
  mode,
  onLoad,
  onPick,
  onDuplicate,
  onUpdate,
  onDelete,
  token,
}) => (
  <div
    css={css`
      padding: ${token.paddingSM}px;
      border-radius: ${token.borderRadius}px;
      border: 1px solid ${isActive ? token.colorPrimary : token.colorBorderSecondary};
      background: ${isActive ? `${token.colorPrimary}08` : token.colorBgContainer};
      margin-bottom: ${token.marginXS}px;
      cursor: ${mode === 'pick' ? 'pointer' : 'default'};
      transition: all ${token.motionDurationMid};
      &:hover {
        border-color: ${token.colorPrimary};
        background: ${isActive ? `${token.colorPrimary}10` : token.colorFillQuaternary};
      }
    `}
    onClick={mode === 'pick' ? () => onPick(homepage.id) : undefined}
  >
    <Flex justify="space-between" align="flex-start">
      <div css={css`flex: 1; min-width: 0;`}>
        <Flex align="center" gap={6}>
          <Text strong css={css`font-size: 13px; color: ${token.colorText};`}>
            {homepage.name}
          </Text>
          {isActive && (
            <CheckOutlined css={css`color: ${token.colorPrimary}; font-size: 11px;`} />
          )}
        </Flex>
        {homepage.description && (
          <Text
            type="secondary"
            css={css`
              font-size: 11px;
              display: block;
              margin-top: 2px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {homepage.description}
          </Text>
        )}
      </div>
      {homepage.category && TEMPLATE_CATEGORIES[homepage.category] && (
        <Tag
          color={TEMPLATE_CATEGORIES[homepage.category].color}
          css={css`margin: 0; font-size: 10px; line-height: 18px;`}
        >
          {TEMPLATE_CATEGORIES[homepage.category].label}
        </Tag>
      )}
    </Flex>

    {mode === 'pick' ? (
      <Flex gap={4} css={css`margin-top: ${token.marginXS}px;`}>
        <Button size="small" type="primary" icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); onPick(homepage.id); }}>
          Edit this template
        </Button>
      </Flex>
    ) : (
      <Flex gap={4} css={css`margin-top: ${token.marginXS}px;`}>
        {!isActive && (
          <Button size="small" type="primary" ghost icon={<PlayCircleOutlined />} onClick={() => onLoad(homepage.id)}>
            Load
          </Button>
        )}
        <Button size="small" type="text" icon={<CopyOutlined />} onClick={() => onDuplicate(homepage.id)}>
          Duplicate
        </Button>
        {!isPreset && isActive && onUpdate && (
          <Button size="small" type="text" icon={<SaveOutlined />} onClick={() => onUpdate(homepage.id)}>
            Update
          </Button>
        )}
        {!isPreset && (
          <Popconfirm
            title={`Delete "${homepage.name}"?`}
            onConfirm={() => onDelete(homepage.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" type="text" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        )}
      </Flex>
    )}
  </div>
);

const SectionLabel = ({ token, children }) => (
  <Text
    type="secondary"
    css={css`
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      display: block;
      margin-bottom: ${token.marginXS}px;
    `}
  >
    {children}
  </Text>
);

export const TemplateDrawer = ({
  open,
  onClose,
  mode = 'browse', // 'browse' | 'pick'
  allHomepages,
  selectedHomepageId,
  onLoad,
  onDuplicate,
  onDelete,
  onUpdate,
  onSaveAs,
  onNewHomepage,
  onPick,
  onEditCurrent,
}) => {
  const { token } = useToken();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('custom');
  const [height, setHeight] = useState(420);

  const presets = allHomepages.filter(h => h.isPreset);
  const custom = allHomepages.filter(h => !h.isPreset);
  const selectedHomepage = allHomepages.find(h => h.id === selectedHomepageId);

  const handleSave = () => {
    if (!name.trim()) return;
    onSaveAs(name.trim(), description.trim(), category);
    setName('');
    setDescription('');
    setCategory('custom');
  };

  const handleNew = () => {
    onNewHomepage();
    onClose();
  };

  const onResizeStart = useCallback((e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (moveEvent) => {
      const delta = startY - moveEvent.clientY;
      setHeight(Math.min(Math.max(startHeight + delta, 200), window.innerHeight - 80));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [height]);

  return (
    <Drawer
      title={mode === 'pick' ? 'Select a template to edit' : 'Templates'}
      open={open}
      onClose={onClose}
      placement="bottom"
      height={height}
      mask={mode === 'pick'}
      styles={{
        body: { padding: `0 ${token.paddingMD}px ${token.paddingSM}px`, overflowX: 'auto' },
        wrapper: { transition: open ? 'none' : undefined, boxShadow: `0 -6px 16px 0 rgba(0, 0, 0, 0.08)` },
        mask: { backdropFilter: 'blur(4px)', background: 'rgba(0, 0, 0, 0.25)' },
      }}
    >
      {/* Resize handle */}
      <div
        onMouseDown={onResizeStart}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          cursor: ns-resize;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover::after, &:active::after {
            background: ${token.colorPrimary};
            opacity: 1;
          }
          &::after {
            content: '';
            width: 40px;
            height: 4px;
            border-radius: 2px;
            background: ${token.colorTextQuaternary};
            opacity: 0.6;
            transition: background ${token.motionDurationMid}, opacity ${token.motionDurationMid};
          }
        `}
      />
      <div css={css`display: flex; gap: ${token.marginLG}px; height: 100%;`}>
        {/* Presets column */}
        <div css={css`flex: 1; min-width: 260px; overflow-y: auto;`}>
          <SectionLabel token={token}>Presets</SectionLabel>
          {presets.map(h => (
            <TemplateCard
              key={h.id}
              homepage={h}
              isActive={selectedHomepageId === h.id}
              isPreset
              mode={mode}
              onLoad={onLoad}
              onPick={onPick}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              token={token}
            />
          ))}
        </div>

        {/* My Templates column */}
        <div css={css`flex: 1; min-width: 260px; overflow-y: auto; border-left: 1px solid ${token.colorBorderSecondary}; padding-left: ${token.paddingMD}px;`}>
          <SectionLabel token={token}>My Templates</SectionLabel>
          {custom.length > 0 ? custom.map(h => (
            <TemplateCard
              key={h.id}
              homepage={h}
              isActive={selectedHomepageId === h.id}
              isPreset={false}
              mode={mode}
              onLoad={onLoad}
              onPick={onPick}
              onDuplicate={onDuplicate}
              onUpdate={onUpdate}
              onDelete={onDelete}
              token={token}
            />
          )) : (
            <Text type="secondary" css={css`font-size: 12px;`}>
              No custom templates yet.
            </Text>
          )}
        </div>

        {/* Save form / start from scratch column */}
        <div css={css`width: 280px; min-width: 280px; border-left: 1px solid ${token.colorBorderSecondary}; padding-left: ${token.paddingMD}px; display: flex; flex-direction: column;`}>
          {mode === 'pick' ? (
            <>
              {selectedHomepage && (
                <>
                  <SectionLabel token={token}>Current template</SectionLabel>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={onEditCurrent}
                    css={css`width: 100%; margin-bottom: ${token.marginSM}px;`}
                  >
                    Edit "{selectedHomepage.name}"
                  </Button>
                </>
              )}
              <SectionLabel token={token}>Or start fresh</SectionLabel>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleNew}
                css={css`width: 100%;`}
              >
                Edit from scratch
              </Button>
              <Text type="secondary" css={css`font-size: 11px; margin-top: ${token.marginSM}px; display: block;`}>
                Or click any template on the left to edit it instead.
              </Text>
            </>
          ) : (
            <>
              <SectionLabel token={token}>Save current layout</SectionLabel>
              <Space direction="vertical" css={css`width: 100%;`} size="small">
                <Input
                  placeholder="Template name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onPressEnter={handleSave}
                />
                <Input.TextArea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
                <Select
                  value={category}
                  onChange={setCategory}
                  css={css`width: 100%;`}
                  options={Object.entries(TEMPLATE_CATEGORIES).map(([key, val]) => ({
                    value: key,
                    label: <Tag color={val.color} css={css`margin: 0;`}>{val.label}</Tag>,
                  }))}
                />
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                  disabled={!name.trim()}
                  css={css`width: 100%;`}
                >
                  Save Template
                </Button>
              </Space>
              <div css={css`flex: 1;`} />
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleNew}
                css={css`width: 100%; margin-top: ${token.marginSM}px;`}
              >
                Start from scratch
              </Button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};
