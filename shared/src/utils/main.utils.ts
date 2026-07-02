export const arrTrue: any[] = [1, "1", "true"];

export function buildPath(
  arrStr: (string | number | any)[],
  options: { absolute?: boolean; lowerCase?: boolean } = {
    absolute: false,
    lowerCase: false,
  },
): string {
  if (!arrStr || arrStr.length === 0) return "";

  let path = arrStr
    .map((s) => {
      let value = "";

      if (typeof s === "number") {
        value = s.toString();
      } else if (typeof s === "string") {
        value = s;
      } else {
        return "";
      }

      return value.trim().replace(/^\/+|\/+$/g, "");
    })
    .filter((s) => s !== "")
    .join("/");

  if (options.lowerCase) {
    path = path.toLowerCase();
  }

  return options?.absolute ? `/${path}` : path;
}
