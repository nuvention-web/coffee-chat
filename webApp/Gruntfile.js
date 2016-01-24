module.exports = function(grunt) {

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'server.js'
			},
			options: {
				ignore: ['node_modules/**', 'Gruntfile.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['npm-install', 'nodemon']);
};