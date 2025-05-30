export function createSlug(title) {
    return title
      .toLowerCase() // Convert the string to lowercase
      .trim() // Remove whitespace from both ends of a string
      .replace(/[^\w\s-]/g, "") // Remove all non-word characters (except spaces and hyphens)
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  }