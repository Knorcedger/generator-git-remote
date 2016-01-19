'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: function() {
		var done = this.async();
		var self = this;
		this.prompt({
			type: 'input',
			name: 'remoteUrl',
			message: 'What is the git remote url (origin)?'
		}, function(answers) {
			if (answers.remoteUrl) {
				self.spawnCommandSync('git', ['remote', 'add', 'origin',
					answers.remoteUrl]);
				console.log('Git remote added!');
			}
			done();
		});
	}
});
