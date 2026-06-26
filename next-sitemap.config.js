/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://piratetravelagency.com",
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    return [
      { loc: "/", priority: 1.0, changefreq: "daily" },
      { loc: "/destinacii", priority: 0.9, changefreq: "daily" },
      { loc: "/personalni-oferti", priority: 0.7, changefreq: "monthly" },
      { loc: "/za-nas", priority: 0.5, changefreq: "monthly" },
      { loc: "/kontakti", priority: 0.5, changefreq: "monthly" },
    ];
  },
};
