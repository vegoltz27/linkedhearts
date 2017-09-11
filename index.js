var Metalsmith  = require('metalsmith');
var assets      = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var copy        = require('metalsmith-copy');
var marko       = require('marko');
var images      = require('./scripts/projectImages');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');
var sharp       = require('metalsmith-sharp');

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
  .use(images( [ // add all images to its matching project
    {
        pattern: 'gallery/**/*.md',
        imagesDirectory: '.',
        imagesKey: 'gallery',
        relative: true
    },
    {
        pattern: 'index.md',
        imagesDirectory: '.',
        imagesKey: 'headerCarousel',
        relative: true,
        global: true,
        globalPattern: '**/*.md'
    }
  ]))
  .use(collections({
    navItems: {
      pattern: '**/index.md'
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'marko',
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

Metalsmith(__dirname)
  .clean(false)
  .source('./src')
  .destination('./build')
  .use(sharp({
    src: 'gallery/**/*.jpg',
    methods: [
      {
        name: 'resize',
        args: [ 800, 800 ]
      },
      { name: 'max' }
    ],
    moveFile: false
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });;