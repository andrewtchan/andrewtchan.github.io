const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownItFootnote = require("markdown-it-footnote");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['webp', "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "auto",
      },
      pictureAttributes: {}
    },
  });
  eleventyConfig.addFilter("readableDatePST", (date) => {
    return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("htmlDatePST", (date) => {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });
};