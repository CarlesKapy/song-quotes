module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'sass/main.css': 'sass/main.sass'
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'dist/public/css/main.min.css': 'sass/main.css'
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./views",
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
        watch: {
            ts: {
                files: ["\*\*/\*.ts"],
                tasks: ["ts"]
            },
            views: {
                files: ["views/**/*.twig"],
                tasks: ["copy"]
            },
            sass: {
                files: ['sass/**/*.sass'],
                tasks: ['sass']
            },
            styles: {
                files: ['sass/main.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "sass",
        "cssmin",
        "copy",
        "ts"
    ]);

};