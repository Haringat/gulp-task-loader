'use strict';

module.exports = (function() {

    /**
     * Test task "subFolder:a:deep:folder:structure:deepTask"
     * @function
     * @returns {string}
     */
    function Task() {
        return 'deepTask';
    }

    Task.dependencies = [':::::subTask1'];

    return Task;
})();