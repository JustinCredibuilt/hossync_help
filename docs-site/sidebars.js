/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/quick-start"]
    },
    {
      type: "category",
      label: "Connecting Providers",
      items: [
        "connecting-providers/overview",
        "connecting-providers/eld-connection",
        "connecting-providers/payroll-connection"
      ]
    },
    {
      type: "category",
      label: "Managing Drivers",
      items: ["managing-drivers/overview"]
    },
    {
      type: "category",
      label: "Reviewing Sync Runs",
      items: [
        "reviewing-sync-runs/dashboard",
        "reviewing-sync-runs/jobs-and-retries"
      ]
    },
    {
      type: "category",
      label: "Troubleshooting",
      items: ["troubleshooting/common-issues"]
    },
    {
      type: "category",
      label: "Security and Access",
      items: ["security-and-access/roles-and-authentication"]
    },
    {
      type: "category",
      label: "Legal",
      items: ["legal/terms-of-service"]
    }
  ]
};

module.exports = sidebars;
