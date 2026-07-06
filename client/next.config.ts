import type { NextConfig } from "next";
import os from "os";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

const networkInterfaces = os.networkInterfaces(),
  localIPs: string[] = [];
Object.keys(networkInterfaces).forEach((interfaceName) => {
  networkInterfaces[interfaceName]?.forEach((iface) => {
    if (iface.family === "IPv4" && !iface.internal)
      localIPs.push(iface.address);
  });
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [...localIPs],
  transpilePackages: ["@project/shared"],
  turbopack: {
    root: `${path.join(__dirname)}/../`,
  },
};

export default nextConfig;
