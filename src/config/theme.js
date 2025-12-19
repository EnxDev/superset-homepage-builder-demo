import { theme } from 'antd';

// Superset dark theme token customization
export const getDarkTheme = () => ({
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#20A7C9',
    colorBgContainer: '#2D3339',
    colorBgElevated: '#2D3339',
    colorBgLayout: '#1B1F23',
    colorBorder: '#3D444D',
    colorBorderSecondary: '#363D44',
    colorText: '#E8E9EA',
    colorTextSecondary: '#9AA0A6',
    colorTextTertiary: '#6B7280',
    colorFillQuaternary: 'rgba(255, 255, 255, 0.04)',
    colorFillTertiary: 'rgba(255, 255, 255, 0.08)',
    colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 6,
    colorSuccess: '#59B578',
    colorWarning: '#FFA94D',
    colorError: '#EF4444',
  },
  components: {
    Layout: {
      headerBg: '#2D3339',
      bodyBg: '#1B1F23',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: '#363D44',
      darkItemHoverBg: '#363D44',
    },
    Card: {
      colorBgContainer: '#2D3339',
      colorBorderSecondary: '#3D444D',
    },
    Button: {
      defaultBg: 'transparent',
      defaultBorderColor: '#20A7C9',
      defaultColor: '#20A7C9',
    },
    Modal: {
      contentBg: '#2D3339',
      headerBg: '#2D3339',
      footerBg: '#262B31',
    },
    Segmented: {
      itemSelectedBg: '#20A7C9',
      itemSelectedColor: '#fff',
      trackBg: '#262B31',
    }
  }
});

// Superset light theme token customization
export const getLightTheme = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#20A7C9',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F7F7F7',
    colorBorder: '#E0E0E0',
    colorBorderSecondary: '#F0F0F0',
    colorText: '#1F1F1F',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
    colorFillQuaternary: 'rgba(0, 0, 0, 0.02)',
    colorFillTertiary: 'rgba(0, 0, 0, 0.04)',
    colorFillSecondary: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 6,
    colorSuccess: '#59B578',
    colorWarning: '#FFA94D',
    colorError: '#EF4444',
  },
  components: {
    Layout: {
      headerBg: '#FFFFFF',
      bodyBg: '#F7F7F7',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#E6F7FC',
      itemHoverBg: '#F0F0F0',
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      colorBorderSecondary: '#E0E0E0',
    },
    Button: {
      defaultBg: 'transparent',
      defaultBorderColor: '#20A7C9',
      defaultColor: '#20A7C9',
    },
    Modal: {
      contentBg: '#FFFFFF',
      headerBg: '#FFFFFF',
      footerBg: '#F7F7F7',
    },
    Segmented: {
      itemSelectedBg: '#20A7C9',
      itemSelectedColor: '#fff',
      itemColor: '#444444',
      itemBg: 'transparent',
      trackBg: '#E8E8E8',
    }
  }
});
