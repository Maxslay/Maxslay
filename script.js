const secretInput = [0, 1, 1, 0, 1, 0, 0, 1]; // jawapan sebenar
const finalMessage = "Q1RGe0lfbG92ZV95b3VfYW5kX0lfbWlzc195b3V9"; // base64 encoded

function complexLogic(bits) {
  const l1 = bits.map((b, i) => b ^ ((i % 2 === 0) ? 1 : 0)).map(b => b ^ 1);
  const l2 = l1.map((b, i) => {
    const a = secretInput[i];
    return ~(a & b) & 1;
  });
  const l3 = l2.map((b, i) => b ^ l2[7 - i]);
  return l3;
}

function startCTF() {
  const input = document.getElementById("binaryInput").value.trim();
  const output = document.getElementById("output");

  if (!/^[01]{8}$/.test(input)) {
    output.textContent = "❌ Input mesti tepat 8 digit binary (0 dan 1 sahaja). Contoh: 11001010";
    return;
  }

  const inputBits = input.split("").map(Number);
  const processed = complexLogic(inputBits);
  const isMatch = processed.every((v, i) => v === secretInput[i]);

  if (isMatch) {
    const decoded = atob(finalMessage);
    output.textContent = "✅ FLAG:\nCTF{" + decoded.split("{")[1];
  } else {
    output.textContent = "🚫 Logic gate mismatch.";
  }
}
