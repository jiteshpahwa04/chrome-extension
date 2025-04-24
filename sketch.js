// sketch.js

// p5 will call setup() automatically
async function setup() {
  noCanvas();  // clear any previous canvas

  // 1) grab the last‐selected text
  chrome.storage.local.get('selectedWord', async ({ selectedWord }) => {
    const text = (selectedWord || '').trim();

    // show it immediately
    document.getElementById('input_text').textContent = text || '(nothing selected)';

    if (!text) {
      document.getElementById('analysis_result').textContent = 'No text to analyze.';
      return;
    }

    // 2) POST it as JSON to your server
    let result;
    try {
      const resp = await fetch('https://misleading-information-analyzer.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const { result: isMisleading } = await resp.json();

      // 3) decide what to show
      result = isMisleading
        ? '⚠️ Misleading information detected'
        : '✅ No misleading information detected';
    } catch (err) {
      console.error(err);
      result = 'Error analyzing text.';
    }

    document.getElementById('analysis_result').textContent = result;
  });
}