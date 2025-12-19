/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex, Input, Tag, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { useToken } = theme;

export const SearchBoxWidget = ({ config }) => {
  const { token } = useToken();

  return (
    <div>
      <Input size="large" placeholder={config.placeholder || 'Search dashboards, charts, datasets...'} prefix={<SearchOutlined css={css`color: ${token.colorTextTertiary};`} />} css={css`border-radius: ${token.borderRadiusLG}px;`} />
      <Flex gap={token.marginXS} css={css`margin-top: ${token.marginSM}px;`}><Tag css={css`cursor: pointer;`}>Dashboards</Tag><Tag css={css`cursor: pointer;`}>Charts</Tag><Tag css={css`cursor: pointer;`}>Datasets</Tag><Tag css={css`cursor: pointer;`}>Queries</Tag></Flex>
    </div>
  );
};
