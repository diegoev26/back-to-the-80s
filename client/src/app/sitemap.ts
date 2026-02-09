import { MetadataRoute } from "next";
import config from "@/config/config";
const { publicUrl } = config;
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = publicUrl;

  // 1. Rutas Estáticas
  const staticRoutes = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Rutas Dinámicas (Ejemplo: Productos)
  /*
  const response = await fetch('https://api.tuweb.com/products');
  const products = await response.json();

  const productRoutes = products.map((prod: any) => ({
    url: `${baseUrl}/productos/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));
  */

  return [...staticRoutes /*, ...productRoutes*/];
}
