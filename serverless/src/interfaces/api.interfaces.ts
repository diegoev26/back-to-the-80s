export interface ServerlessResponseResult {
  statusCode: number;
  body: string | undefined;
  headers: Record<string, string>;
}
