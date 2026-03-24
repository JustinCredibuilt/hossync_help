const path = require("path");

const siteUrl = process.env.DOCS_SITE_URL || "https://docs.hossync.com";
const parsedSiteUrl = new URL(siteUrl);
const baseUrl = normalizeBaseUrl(process.env.DOCS_BASE_URL || "/");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "HOSSync Docs",
  tagline: "Operational documentation for HOSSync customers",
  favicon: "img/favicon.svg",
  url: `https://justincredibuilt.github.io`,
  baseUrl: "/hossync-docs/",
  organizationName: "justincredibuilt",
  projectName: "hossync-docs",
  trailingSlash: false,
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
      onBrokenMarkdownImages: "ignore"
    }
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: path.resolve(__dirname, "../docs/public"),
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/hossync/hossync_platform/tree/main",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ],
  themeConfig: {
    image: "img/social-card.svg",
    navbar: {
      title: "HOSSync Docs",
      logo: {
        alt: "HOSSync",
        src: "img/logo.svg"
      },
      items: [
        { to: "/", label: "Overview", position: "left" },
        { to: "/getting-started/quick-start", label: "Quick Start", position: "left" },
        { to: "/reviewing-sync-runs/dashboard", label: "Runs", position: "left" },
        {
          href: "https://app.hossync.com",
          label: "Open App",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Quick Start", to: "/getting-started/quick-start" },
            { label: "Troubleshooting", to: "/troubleshooting/common-issues" }
          ]
        },
        {
          title: "Platform",
          items: [
            { label: "Dashboard", to: "/reviewing-sync-runs/dashboard" },
            { label: "Driver Management", to: "/managing-drivers/overview" }
          ]
        },
        {
          title: "Legal",
          items: [
            { label: "Terms of Service", to: "/legal/terms-of-service" }
          ]
        }
      ],
      copyright: `Copyright ${new Date().getFullYear()} HOSSync`
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false
    }
  },
  themes: []
};

function normalizeBaseUrl(value) {
  if (!value || value === "/") {
    return "/";
  }

  const trimmed = value.trim();
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

module.exports = config;
