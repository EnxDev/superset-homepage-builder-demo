/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Tag, theme } from 'antd';
import { MOCK_TAGS } from '../../../constants';

const { useToken } = theme;

export const TagCloudWidget = ({ config }) => {
  const { token } = useToken();

  return (
    <Flex wrap="wrap" gap={4}>
      {MOCK_TAGS.slice(0, config.limit || 20).map((tag) => (
        <Tag key={tag.name} color={tag.color} css={css`cursor: pointer; font-size: ${Math.min(11 + tag.count / 10, 14)}px; padding: 2px 6px; margin: 0; line-height: 1.4;`}>{tag.name} ({tag.count})</Tag>
      ))}
    </Flex>
  );
};
