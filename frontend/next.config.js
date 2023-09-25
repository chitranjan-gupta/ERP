const nextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
