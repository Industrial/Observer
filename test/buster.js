var out = module.exports;

out['Browser tests'] = {
  env:      'browser',
  rootPath: '../',
  sources:  ['lib/**/*.js'],
  tests:    ['test/**/*-test.js']
};

out['Node.JS tests'] = {
  env:      'node',
  rootPath: '../',
  tests:    ['test/**/*-test.js']
};
