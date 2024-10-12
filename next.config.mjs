/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4|mov|wmv|avi|mkv)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'videos/',
                },
            },
        });
        return config;
    },
};

export default nextConfig;