# Gulp-loadtasks

This is a complete rewrite of hontas/gulp-task-loader with some additions.

## Install

For now, only github installation is supported, as I haven't had the time to read up on how to host a package on npm yet. (still coming)

```shell
    npm install --save-dev https://github.com/Haringat/gulp-loadtasks.git
```

## Usage

### Create a task

To create a task you simply need to default export an object that has a function (the actual task) and its dependencies. Either of these can be left away if not needed. The example shows their default values.

#### Typescript

```js
    function task(done: Function) {
        // compile stuff
        done();
    }

    export default {
        fn: task,
        dependencies: []
    }
```

#### ES5

This is how you specify a task in pure js. The example is written in es5, if you want an es7 example you can basically copy & paste the ts one.

```js
    exports["__esModule"] = true;

    function task(done) {
        // compile stuff
        done();
    }

    exports.default = {
        fn: task,
        dependencies: []
    };
```

### Load tasks

#### Typescript

Loading a task tree is actually pretty simple. All you need to pass in are the directory that it should load from and a gulp instance.

```js
    import gulp = require("gulp");
    import gulpLoadTasks from "gulp-loadtasks";

    gulpLoadTasks({
        rootDir: "./TaskDir",
        extensions: [".ts"],
        gulp: gulp
    });
```

#### ES5

```js
    var gulp = require("gulp");
    let gulpLoadTasks = require("gulp-loadtasks").default;

    gulpLoadTasks({
        rootDir: "./TaskDir",
        extensions: [".js"],
        gulp: gulp
    });
```