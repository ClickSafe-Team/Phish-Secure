export async function shareScanResult(url: string, summary: string) {
  if (navigator.share) {
    await navigator.share({
      title: "Cipher Sentry Scan Result",
      text: summary,
      url,
    });
    return;
  }

  await navigator.clipboard.writeText(`${summary}\n${url}`);
}
