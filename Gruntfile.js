module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
                         concat: {
                             dist: {
                                 src: [
                                     'js/license.js',
                                     'js/clm.js',
                                     'js/svmfilter_webgl.js',
                                     'js/svmfilter_fft.js',
                                     'js/mossefilter.js',
                                     'js/jsfeat_detect.js',
                                     'js/jsfeat_detect_worker.js',
                                     'examples/js/libs/left_eye_filter.js',
                                     'examples/js/libs/right_eye_filter.js',
                                     'examples/js/libs/nose_filter.js',
                                     'examples/js/libs/numeric-1.2.6.js',
                                     'examples/js/libs/jsfeat-min.js',
                                     'examples/js/libs/frontalface.js',
                                     'examples/js/libs/mosse.js',
                                     'tpl/clm.footer.js.tpl',
                                 ],
                                 dest: './dist/clmtrackr.js'
                             }, numeric: {
                                 src: [
                                     'examples/js/libs/numeric-1.2.6.js',
                                 ],
                                 dest: './dist/numeric-1.2.6.js'
                             },
                             model_pca_10_mosse: {
                                 src: [
                                     'models/model_pca_10_mosse.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_pca_10_mosse.js'
                             }, model_pca_10_svm: {
                                 src: [
                                     'models/model_pca_10_svm.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_pca_10_svm.js'
                             }, model_pca_20_mosse: {
                                 src: [
                                     'models/model_pca_20_mosse.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_pca_20_mosse.js'
                             }, model_pca_20_svm: {
                                 src: [
                                     'models/model_pca_20_svm.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_pca_20_svm.js'
                             }, model_spca_10_svm: {
                                 src: [
                                     'models/model_spca_10_svm.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_spca_10_svm.js'
                             }, model_spca_20_svm: {
                                 src: [
                                     'models/model_spca_20_svm.js',
                                     'tpl/model.footer.js.tpl',
                                 ],
                                 dest: './dist/models/model_spca_20_svm.js'
                             }
                         },
                         uglify: {
                             options: {
                                 report: 'min',
                                 preserveComments: 'false',
                                 mangle: {
                                     except: ['clmtrackr']
                                 },
                                 compress: {
                                     drop_console: true
                                 }
                             },
                             dist: {
                                 src: ['./dist/clmtrackr.js'],
                                 dest: './dist/clmtrackr.min.js'
                             }
                         }
                     });

    // Default task.
    grunt.registerTask('default', [
        'concat',
        'uglify'
    ]);
};
