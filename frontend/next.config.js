const nextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/signup",
        permanent: true,
      },
      {
        source: "/forgotpassword",
        destination: "/forgot",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
