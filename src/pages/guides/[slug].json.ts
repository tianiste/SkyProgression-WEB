import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

/** A guide's requirements as JSON, the input for the player checklist. */
export const getStaticPaths = (async () => {
  const guides = await getCollection("guides");
  return guides.map((g) => ({ params: { slug: g.id }, props: { guide: g } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { guide } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]["props"];
  const { title, method, updated, hotm, requirements } = guide.data;
  return new Response(JSON.stringify({ id: guide.id, title, method, updated, hotm, requirements }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
