module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/sass/main.css': 'src/sass/main.sass'
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'dist/public/css/main.min.css': 'src/sass/main.css'
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./src/public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./src/views",
                        src: ["**"],
                        dest: "./dist/views"
                    }
                ]
            }
        },
        ts: {
            default: {
                tsconfig: true
            }
        },
        apidoc: {
            myapp: {
                src: "src/",
                dest: "src/public/doc",
                options: {
                    debug: true,
                    excludeFilters: [ "node_modules/", "dist/" ]
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            views: {
                files: ["src/views/**/*.twig"],
                tasks: ["copy"]
            },
            sass: {
                files: ['src/sass/**/*.sass'],
                tasks: ['sass']
            },
            styles: {
                files: ['src/sass/main.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-apidoc');

    grunt.registerTask("default", [
        "apidoc",
        "sass",
        "cssmin",
        "copy",
        "ts"
    ]);

};