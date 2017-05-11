/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')
const Funnel     = require('broccoli-funnel')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    babel : {
      plugins : [
        'transform-object-rest-spread',
      ],
    },

    nodeModulesToVendor : [
      ...(process.env.EMBER_ENV === 'test' ? [
        new Funnel('node_modules/sinon/pkg', {
          destDir : 'sinon',
          files   : ['sinon.js']
        })
      ] : [])
    ],
  })

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  if (process.env.EMBER_ENV === 'test') {
    app.import('vendor/sinon/sinon.js', {
      using : [
        { transformation : 'amd', as : 'sinon' }
      ]
    })
  }

  return app.toTree()
}
