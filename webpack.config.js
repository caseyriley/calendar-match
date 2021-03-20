module.exports = {
    module: {
        rules: {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        // you can also read from a file, e.g. `variables.scss`
                        // use `prependData` here if sass-loader version = 8, or
                        // `data` if sass-loader version < 8
                        additionalData: `$color-1: rgb(45, 228, 149)`,
                    },
                },
            ],
        },
    },
    // plugin omitted
};
