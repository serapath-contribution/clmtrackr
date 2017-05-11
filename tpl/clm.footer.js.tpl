if (typeof exports !== 'undefined') {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = clm;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.clm = clm;
} else if (typeof global !== 'undefined') {
    // No CommonJS or Node.js module support, export to the global (window)
    global.clm = clm;
}