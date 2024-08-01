/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'static01.nyt.com',
            
          },
          {
            protocol: 'https',
            hostname: 'media.gettyimages.com',
            
          },
          {
            protocol: 'https',
            hostname: 'th.bing.com',
            
          },
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            
          },
         
         
        ],
      },
};

export default nextConfig;
