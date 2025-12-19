/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Row, Col, Flex, Typography, theme } from 'antd';
import {
  BarChartOutlined,
  FileTextOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import { WIDGET_TYPES, CATEGORY_NAMES } from '../../config';

const { Text } = Typography;
const { useToken } = theme;

/**
 * Widget Picker Component
 * Modal content for selecting widgets to add
 */
export const WidgetPicker = ({ onAddWidget, currentRegion }) => {
  const { token } = useToken();

  // Organize categories into logical groups for 3-column layout
  const categoryGroups = [
    // Column 1: Data & Analytics
    {
      title: 'Data & Analytics',
      icon: <BarChartOutlined />,
      color: token.colorPrimary,
      categories: ['data', 'analytics']
    },
    // Column 2: Content & Communication
    {
      title: 'Content & Communication',
      icon: <FileTextOutlined />,
      color: token.colorSuccess,
      categories: ['content', 'communication']
    },
    // Column 3: Navigation, Organization & AI
    {
      title: 'Tools & AI',
      icon: <RobotOutlined />,
      color: token.colorWarning,
      categories: ['navigation', 'organization', 'ai']
    }
  ];

  // Build widget lists per category
  const widgetsByCategory = {};
  Object.values(WIDGET_TYPES).forEach(w => {
    if (w.allowedRegions.includes(currentRegion)) {
      if (!widgetsByCategory[w.category]) {
        widgetsByCategory[w.category] = [];
      }
      widgetsByCategory[w.category].push(w);
    }
  });

  return (
    <Row gutter={[token.marginLG, token.marginMD]}>
      {categoryGroups.map((group, groupIndex) => {
        const hasWidgets = group.categories.some(cat => widgetsByCategory[cat]?.length > 0);
        if (!hasWidgets) return null;

        return (
          <Col span={8} key={groupIndex}>
            <div css={css`
              background: ${token.colorFillQuaternary};
              border-radius: ${token.borderRadiusLG}px;
              padding: ${token.paddingMD}px;
              height: 100%;
              border: 1px solid ${token.colorBorderSecondary};
            `}>
              {/* Group Header */}
              <Flex align="center" gap={token.marginXS} css={css`
                margin-bottom: ${token.marginMD}px;
                padding-bottom: ${token.paddingSM}px;
                border-bottom: 2px solid ${group.color};
              `}>
                <span css={css`
                  color: ${group.color};
                  font-size: ${token.fontSizeLG}px;
                `}>
                  {group.icon}
                </span>
                <Text strong css={css`
                  font-size: ${token.fontSizeSM}px;
                  color: ${token.colorText};
                `}>
                  {group.title}
                </Text>
              </Flex>

              {/* Categories within this group */}
              {group.categories.map(catKey => {
                const widgets = widgetsByCategory[catKey];
                if (!widgets?.length) return null;

                return (
                  <div key={catKey} css={css`margin-bottom: ${token.marginMD}px;`}>
                    <Text type="secondary" css={css`
                      font-size: 11px;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      font-weight: 600;
                    `}>
                      {CATEGORY_NAMES[catKey]}
                    </Text>
                    <div css={css`margin-top: ${token.marginXS}px;`}>
                      {widgets.map(w => (
                        <div
                          key={w.id}
                          onClick={() => onAddWidget(w.id)}
                          css={css`
                            display: flex;
                            align-items: center;
                            gap: ${token.marginXS}px;
                            padding: ${token.paddingXS}px ${token.paddingSM}px;
                            margin-bottom: ${token.marginXXS || 4}px;
                            border-radius: ${token.borderRadius}px;
                            cursor: pointer;
                            transition: all ${token.motionDurationMid};
                            background: transparent;

                            &:hover {
                              background: ${token.colorFillSecondary};
                              transform: translateX(4px);
                            }
                          `}
                        >
                          <span css={css`
                            color: ${token.colorTextSecondary};
                            font-size: ${token.fontSize}px;
                            display: flex;
                            align-items: center;
                          `}>
                            {w.icon}
                          </span>
                          <Text css={css`
                            font-size: ${token.fontSizeSM}px;
                            color: ${token.colorText};
                          `}>
                            {w.name}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
