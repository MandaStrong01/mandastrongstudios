// Bolt.host Deployment Configuration
export default {
  build: {
    command: 'npm run build',
    output: 'dist',
    environment: {
      NODE_ENV: 'production'
    }
  },
  routes: [
    {
      src: '/(.*)',
      dest: '/index.html'
    }
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ]
};
