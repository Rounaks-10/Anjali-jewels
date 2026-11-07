export const getProductSlug = (item) => {
  const nameSlug = String(item?.name ?? "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${nameSlug}-${item?.id ?? "item"}`;
};

export const getProductPath = (item) => `/product/${getProductSlug(item)}`;

export const getTitleFromProductSlug = (slug) => {
  const titlePart = String(slug ?? "")
    .replace(/-\d+$/, "")
    .replace(/-/g, " ");

  return titlePart.replace(/\b\w/g, (letter) => letter.toUpperCase());
};
