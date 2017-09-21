import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import {nameLibrary,PATH_SRC,PATH_DIST} from './config-library.js';
export default {
    input: PATH_SRC+'directive.data'+'/'+nameLibrary+'.js',
    name: nameLibrary,
    sourcemap:true,
    external: [
        'angular',
    ],
    output: {
      file: PATH_DIST+nameLibrary+".umd.js",
      format: 'umd',
    },
    plugins: [
      resolve({
           module: true,
           main: true
      }),
      commonjs({
           include: 'node_modules/**',
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      // eslint({
      //   exclude: [
      //     'src/styles/**',
      //   ]
      // }),
    ],
    onwarn: warning => {
         const skip_codes = [
         'THIS_IS_UNDEFINED',
         'MISSING_GLOBAL_NAME'
    ];
    if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};
