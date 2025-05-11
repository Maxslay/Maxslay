(function() {
  const output = document.getElementById("output");
  const finalKey = "01011010";
  const xorKey = 42;
  const partBEnc = [35, 70, 70, 116, 105, 71, 79, 67, 77]; // XOR encrypted 'love_you'
  const netResponse = "YW5kX0lfbWlzc195b3U="; // and_I_miss_you

  const detectDebug = () => {
    if (window.outerHeight - window.innerHeight > 200) {
      output.textContent = "⚠️ DevTools detected. Challenge paused.";
      throw new Error("No cheating!");
    }
  }

  const fakeFetch = () => new Promise(resolve => {
    setTimeout(() => {
      resolve(atob(netResponse));
    }, 1000);
  });

  function validateLogic(bits) {
    const secret = finalKey.split('').map(Number);
    const xor = bits.map((b, i) => b ^ bits[7 - i]);
    return xor.every((v, i) => v === secret[i]);
  }

  function decryptXOR(arr) {
    return arr.map(c => String.fromCharCode(c ^ xorKey)).join('');
  }

  window.startCTF = async function () {
    detectDebug();

    const input = document.getElementById("binaryInput").value.trim();
    if (!/^[01]{8}$/.test(input)) {
      output.textContent = "❌ Invalid binary input.";
      return;
    }

    const bits = input.split("").map(Number);
    if (!validateLogic(bits)) {
      output.textContent = "🚫 Logic gate mismatch.";
      return;
    }

    const partB = decryptXOR(partBEnc); // love_you
    const partC = await fakeFetch();    // and_I_miss_you

    output.textContent = `🎉 FLAG:\nCTF{I_${partB}_${partC}}`;
  }
})();
