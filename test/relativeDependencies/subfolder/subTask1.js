'use strict';

module.exports = (function() {

    /**
     * Test task "subTask1"
     * @function
     * @returns {string}
     */
    function Task() {
        return 'subTask1';
    }

    Task.dependencies = [];

    return Task;
})();