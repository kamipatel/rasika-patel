import projectImages from "../data/project-images.json";

export function getProjectImages(slug) {
  return (
    projectImages[slug] ||
    projectImages[`project-${slug}`] ||
    { cover: null, images: [], videos: [], embeds: [], links: [] }
  );
}
