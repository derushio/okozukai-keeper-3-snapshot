/**
 * 待ち関数
 */
export async function wait(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
