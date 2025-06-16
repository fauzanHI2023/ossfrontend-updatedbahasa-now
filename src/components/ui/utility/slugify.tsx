export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alphanumeric dengan tanda "-"
      .replace(/(^-|-$)/g, ""); // Hapus tanda "-" di awal atau akhir
  };
  