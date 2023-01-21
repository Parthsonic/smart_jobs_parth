export default [
    {
      context: [
          '/api/*',
          '/login/*',
          '/jobpost/*'
      ],
      target: 'http://localhost:9090',
      secure: false,
      logLevel:debug,
      changeOrigin: true
    }
  ];