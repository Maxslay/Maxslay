// 🎭 Anti-debug + Reverse bait
if (window.console) {
  setInterval(() => {
    console.clear(); // Bait: Buat apa tu :)
  }, 100);
}

const encryptedFlag = "aXZlIGxvdmUgeW91IGFuZCBpIG1pc3MgeW91"; // Base64 of actual message
const correctBits = [0, 1, 0, 1, 1, 0, 1, 0]; // 01011010

function fakeNetworkValidation(bits) {
  // Simulate network check
  return new Promise((resolve) => {
    setTimeout(() => {
      const hash = bits.reduce((acc, bit, i) => acc ^ (bit << i), 0x2A); // XOR-based fake cipher
      resolve(hash === 127); // must match 127
    }, 700); // delay to simulate network
  });
}

function logicGateCheck(bits) {
  // Digital logic layer: XOR with mirror, then NAND with secret
  const mirrorXor = bits.map((b, i) => b ^ bits[7 - i]);
  const secret = correctBits;
  return mirrorXor.map((b, i) => ~(b & secret[i]) & 1);
}

function reverseBits(bits) {
  return bits.reverse().map((b, i) => b ^ (i % 2));
}

function startChallenge() {
  const input = document.getElementById("binaryInput").value.trim();
  const output = document.getElementById("output");

  if (!/^[01]{8}$/.test(input)) {
    output.textContent = "❌ Invalid input format.";
    return;
  }

  const bits = input.split("").map(Number);
  const stage1 = logicGateCheck(bits);
  const stage2 = reverseBits(stage1);

  fakeNetworkValidation(stage2).then((ok) => {
    if (ok) {
      // Injected payload eval - simulating hidden flag delivery
      const decrypted = atob(encryptedFlag);
      const payload = `(function(){ document.getElementById("output").textContent = "🎉 FLAG: " + "${decrypted}"; })()`;
      eval(payload); // 🔥 exploit-like behaviour
    } else {
      output.textContent = "🚫 Access denied. Try harder.";
    }
  });
}
