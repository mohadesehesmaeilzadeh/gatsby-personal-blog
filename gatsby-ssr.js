const React = require("react")
const { getThemeScript } = require("./src/utils/theme")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "theme-preference",
      id: "theme-preference",
      dangerouslySetInnerHTML: { __html: getThemeScript() },
    }),
  ])
}
