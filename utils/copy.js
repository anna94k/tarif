// ------------- plain text copy

export async function copyContent(content) {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.error(error.message);
  }
}


//--------------- rich text Copy

export async function copyRich(content) {
  const rich = content.innerHTML;
  const plain = content.innerText;

  if (typeof ClipboardItem !== "undefined") {
    const html = new Blob([rich], { type: "text/html" });
    const text = new Blob([plain], { type: "text/plain" });
    const data = new ClipboardItem({ "text/html": html, "text/plain": text });
    await navigator.clipboard.write([data]);
  } else {
    // Fallback using the deprecated `document.execCommand`.
    const cb = e => {
      e.clipboardData.setData("text/html", rich);
      e.clipboardData.setData("text/plain", plain);
      e.preventDefault();
    };
    document.addEventListener("copy", cb);
    document.execCommand("copy");
    document.removeEventListener("copy", cb);
  }
}