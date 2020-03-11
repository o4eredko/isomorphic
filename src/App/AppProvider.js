import React from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import themes from "src/config/theme/theme.config";
import AppLocale from "src/config/translation";


export default function AppProvider({ children }) {
  const locale = "en";
  const { themeName } = useSelector(state => state.themeSwitcher.changeThemes);
  const currentAppLocale = AppLocale[locale];
  return (
    <ConfigProvider locale={ currentAppLocale.antd }>
      <IntlProvider
        locale={ currentAppLocale.locale }
        messages={ currentAppLocale.messages }
      >
        <ThemeProvider theme={ themes[themeName] }>{ children }</ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}
