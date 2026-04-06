import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Opportunity Fabric",
    short_name: "Fabric",
    description:
      "A personalized student roadmap for classes, jobs, and experiences, with clear reasons behind every step.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#b8452f",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
  };
}
