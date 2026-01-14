export function parseCSV(csvText: string) {
  const lines = csvText.trim().split("\n");

  const headers = lines[0]?.split(",").map((h) => h.trim());

  return lines.slice(1).map((line, index) => {
    const values = line.split(",").map((v) => v.trim());
    const data: any = {};

    headers?.forEach((header, i) => {
      data[header] = values[i] || "";
    });

    return {
      rowNumber: index + 2,
      data,
    };
  });
}

export function validateBookRow(book: any) {
  const errors: string[] = [];

  if (!book.title) errors.push("Title is required");
  if (!book.author) errors.push("Author is required");

  if (!book.publishedYear || isNaN(Number(book.publishedYear))) {
    errors.push("Published Year must be a valid number");
  }
  console.log(errors);
  return errors;
}
