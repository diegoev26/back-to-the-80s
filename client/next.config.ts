import type { NextConfig } from "next";
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
};

export default nextConfig;
