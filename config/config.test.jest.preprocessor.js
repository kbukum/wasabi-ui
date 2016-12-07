// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript');
const tsConfig = require('./config.test.jest.json');
const path = require('path');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            console.log(path);
            return tsc.transpile(
                src,
                tsConfig.compilerOptions,
                path,
                []
            );

        }
        return src;
    }
};