'use strict';
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var assign = require('object-assign');

function isString(str) {
	return 'string' === typeof str;
}

function getExtensions() {
	return Object.keys(require.extensions);
}

function getDefaults() {
	return {
		dir: 'gulp-tasks',
		exts: getExtensions() || ['.js']
	};
}

function cleanDir(options) {
	if (!options.dir) return;
	options.dir = options.dir
		.replace(/^\.\//, '')
		.replace(/\/$/, '');
}

module.exports = function(options) {
	if (isString(options)) {
		options = { dir: options };
	}

	if (options) {
		cleanDir(options);
	}

	var opts = assign(getDefaults(), options);

	function byExtension(fileName) {
		var extension = path.extname(fileName);
		return ~opts.exts.indexOf(extension);
	}

	function stripExtension(fileName) {
		var extension = path.extname(fileName);
		return path.basename(fileName, extension);
	}

	function loadTask(parents, task) {
		var namespace = parents.join(path.sep) || '';
		var modulePath = path.join(process.cwd(), opts.dir, namespace, task);
		var func = require(modulePath);
		var dependencies = [];
		if (func.dependencies && func.dependencies instanceof Array) {
			func.dependencies.forEach(function(dep) {
				// determine how many levels we need to walk up the tree
				var prefixRegex = /^:*/;
				var matches = dep.match(prefixRegex);
				if (matches[0]) {
					var depNamespace = parents.slice(0, parents.length - matches[0].length + 1).join(':');
					dep = depNamespace + ':' + dep.replace(prefixRegex, '');
				}
				dependencies.push(dep);
			});
		}
		var taskName = stripExtension(task);
		var context = {
			gulp: gulp,
			opts: opts
		};

		// If subtask -> namespace: "parent:child"
		taskName = (namespace ? namespace.replace(new RegExp(path.sep, 'g'), ':') + ':' : '') + taskName;

		gulp.task(taskName, dependencies, func.bind(context));
	}

	function loadTasks(currentPath) {
		var file = path.basename(currentPath);
		var stats = fs.lstatSync(currentPath);

		if (stats.isFile() && byExtension(file)) {
			loadTask(currentPath.split(path.sep).slice(opts.dir.split(path.sep).length, -1), file);
		}
		else if (stats.isDirectory()) {
			fs.readdirSync(currentPath)
				.forEach(function(subPath){
					loadTasks(path.join(currentPath, subPath));
				});
		}
	}

	loadTasks(opts.dir);
};
