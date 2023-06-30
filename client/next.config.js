/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    env: {
        SERVER_URL: process.env.SERVER_URL,
        API_KEY: process.env.API_KEY,
    },
}

module.exports = nextConfig
