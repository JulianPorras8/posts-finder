module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
      };
    }

    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    return config
  }
}
