'use strict';

module.exports = (function() {

    /**
     * Test task "topTask"
     * @function
     * @returns {string}
     */
    function Task() {
        return 'topTask';
    }

    Task.dependencies = ['subfolder:subTask1'];

    return Task;
})();