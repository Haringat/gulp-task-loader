'use strict';

module.exports = (function() {

    /**
     * Test task "subTask2"
     * @function
     * @returns {string}
     */
    function Task() {
        return 'subTask2';
    }

    Task.dependencies = [':subTask1'];

    return Task;
})();