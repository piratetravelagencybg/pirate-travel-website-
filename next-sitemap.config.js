/** @type {import('next-sitemap').IConfig} */

const OFFER_SLUGS = [
  "gartsia-korfu",
  "turtsia-istanbul",
  "sarbia-belgrad",
  "mania-brashov-drakula",
  "gartsia-lefkada",
  "turtsia-kapadokia",
  "sarbia-ceca-leskovac",
  "italia-sardinia",
];

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://pirate-travel-website-rpwy.vercel.app",
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async () => {
    const offerPaths = OFFER_SLUGS.map((slug) => ({
      loc: `/destinacii/${slug}`,
      priority: 0.8,
      changefreq: "weekly",
    }));

    return [
      { loc: "/",                  priority: 1.0, changefreq: "daily"   },
      { loc: "/destinacii",        priority: 0.9, changefreq: "daily"   },
      { loc: "/personalni-oferti", priority: 0.7, changefreq: "monthly" },
      { loc: "/za-nas",            priority: 0.5, changefreq: "monthly" },
      { loc: "/kontakti",          priority: 0.5, changefreq: "monthly" },
      ...offerPaths,
    ];
  },
};
