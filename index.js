var Metalsmith  = require('metalsmith');
var assets      = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var handlebars  = require('handlebars');
var images      = require("metalsmith-scan-images");
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');

handlebars.registerHelper("debug", function(optionalValue) {
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});

handlebars.registerHelper("mdToHtml", function(val) {
  val = val || '';
  return val.replace('.md', '.html');
});

Metalsmith(__dirname)
  .clean(false)
  .source('./src')
  .destination('./build')
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .use(collections({
    navItems: {
      pattern: '**/index.md'
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials',
    directory: 'templates'
  }))
  .use(assets({
    source: './assets', // relative to the working directory
    destination: './assets' // relative to the build directory
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });