import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
import os from "os";

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
  transpilePackages: ["@back-to-the-80s/shared"],
};

export default nextConfig;
