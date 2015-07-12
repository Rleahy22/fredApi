module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['lib/*.js', 'test/*.js']
        },

        cafemocha: {
            test: {
                src: ['test/*.js'],
                options: {
                    ui: 'bdd',
                    reporter: 'spec',
                    timeout: 7000
                }
            }
        },

        coverageThreshold: 100,

        shell: {
            cov: {
                command: "istanbul cover _mocha -- -R dot",
                options: {
                    stdout: true
                }
            },
            checkCov: {
                command: 'istanbul check-coverage --lines <%= coverageThreshold %>',
                options: {
                    cwd: './coverage',
                    callback: function (err, stdout, stderr, cb) {
                        var matches;
                        if (stderr) {
                            matches = stderr.match(/(ERROR: .*)/);
                            console.log("\n" + matches[0]);
                        }
                        cb();
                    }
                }
            },
            covReport: {
                command: 'open coverage/lcov-report/index.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['jshint', 'cafemocha', 'shell:cov', 'shell:checkCov', 'shell:covReport']);
};