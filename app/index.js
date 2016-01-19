'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: function() {
		// check if the current directory is git
		// if not, don't crash, just log a message
		// we check if isGit by trying to read the config file in .git folder
		var isGit;
		try {
			isGit = Boolean(this.read(this.destinationRoot() + '/.git/config'));
		} catch (e) {

		}
		if (isGit) {
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
		} else {
			console.log('Not a git repo, can\'t add a remote.');
			console.log('Please "git init" first.');
		}
	}
});
