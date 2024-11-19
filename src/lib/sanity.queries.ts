import { defineQuery, groq } from "next-sanity";

export const INDIVIDUAL_POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->,
  categories[]->
}`);

export const POSTS_CARD_QUERY = defineQuery(groq`
    {
      "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        author->{name},
        categories[]->{title}
      },
      "total": count(*[_type == "post"])
    }
  `);

export const POSTS_LIST_SLUG_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
  slug,
}`);
