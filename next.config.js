/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `
        @import "./src/styles/variables/border-radius.scss";
      @import "./src/styles/variables/padding.scss";
      @import "./src/styles/variables/colors.scss";
      @import "./src/styles/variables/typography.scss";
      @import "./src/styles/helpers/devices.scss";
      @import "./src/styles/helpers/extends.scss";
      @import "./src/styles/helpers/functions.scss";
      @import "./src/styles/helpers/mixins.scss";
      @import "./src/styles/layout/columns.scss";
        `,
  },
};

module.exports = nextConfig;
