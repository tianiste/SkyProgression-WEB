import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { guideSchema } from "../../schema/guide";

/** JSON Schema of the guide data format, generated from the site's own schema. */
export const GET: APIRoute = () => {
  const schema = z.toJSONSchema(guideSchema, { io: "input", unrepresentable: "any" });
  return new Response(JSON.stringify({ title: "SkyProgression guide", ...schema }, null, 2), {
    headers: { "Content-Type": "application/schema+json" },
  });
};
