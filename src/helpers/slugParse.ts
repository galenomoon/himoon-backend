export default function slugParse(slug: string) {
  return slug.toLowerCase().replace(/ /g, "-")
}