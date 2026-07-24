document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const shiftKey = document.getElementById('shift-key');
    const keyDecBtn = document.getElementById('key-dec');
    const keyIncBtn = document.getElementById('key-inc');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const charCounter = document.getElementById('char-counter');
    const diagStatus = document.getElementById('diag-status');
    const diagMode = document.getElementById('diag-mode');
    const outputStatus = document.getElementById('output-status');

    // Update character counter
    inputText.addEventListener('input', () => {
        const count = inputText.value.length;
        charCounter.textContent = `Chars: ${count}`;
    });

    // Key adjustment buttons
    keyDecBtn.addEventListener('click', () => {
        let val = parseInt(shiftKey.value) || 0;
        shiftKey.value = val - 1;
    });

    keyIncBtn.addEventListener('click', () => {
        let val = parseInt(shiftKey.value) || 0;
        shiftKey.value = val + 1;
    });

    // Clear input
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        charCounter.textContent = 'Chars: 0';
        inputText.focus();
    });

    // Copy to clipboard
    copyBtn.addEventListener('click', async () => {
        const text = outputText.value;
        if (!text) {
            outputStatus.textContent = 'No data to copy';
            setTimeout(() => outputStatus.textContent = 'Ready', 2000);
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            outputStatus.textContent = 'Copied to clipboard!';
            outputStatus.style.color = 'var(--accent-success)';
            setTimeout(() => {
                outputStatus.textContent = 'Ready';
                outputStatus.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            outputStatus.textContent = 'Copy failed';
            outputStatus.style.color = 'var(--accent-danger)';
            setTimeout(() => {
                outputStatus.textContent = 'Ready';
                outputStatus.style.color = '';
            }, 2000);
        }
    });

    // Cryptographic request handler
    async function processText(action) {
        const text = inputText.value.trim();
        const rawKey = shiftKey.value;
        
        // Client-side validations
        if (!text) {
            showDiagError("Empty Input");
            alert("Please enter some text before processing.");
            return;
        }

        // Key validation: Must be present and an integer
        if (rawKey === "" || isNaN(rawKey) || !Number.isInteger(parseFloat(rawKey))) {
            showDiagError("Invalid Key");
            alert("Shift Key must be a valid integer.");
            return;
        }

        const key = parseInt(rawKey, 10);

        // Update Diagnostics UI to processing state
        diagStatus.textContent = "Processing...";
        diagStatus.className = "value text-working";
        diagMode.textContent = action.charAt(0).toUpperCase() + action.slice(1);
        outputStatus.textContent = "Calculating...";

        try {
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    key: key,
                    action: action
                })
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                // Success
                outputText.value = result.processed_text;
                diagStatus.textContent = "Success";
                diagStatus.className = "value text-success";
                outputStatus.textContent = "Data received";
            } else {
                // Error response from server
                const errMsg = result.message || "Failed to process text";
                showDiagError(errMsg);
                outputText.value = "";
                alert(errMsg);
            }
        } catch (err) {
            console.error('Request error: ', err);
            showDiagError("Network Error");
            outputText.value = "";
            alert("A network error occurred. Please check if backend is running.");
        }
    }

    function showDiagError(msg) {
        diagStatus.textContent = "Error: " + msg;
        diagStatus.className = "value text-danger";
        diagMode.textContent = "None";
        outputStatus.textContent = "Error";
    }

    // Bind action buttons
    encryptBtn.addEventListener('click', () => processText('encrypt'));
    decryptBtn.addEventListener('click', () => processText('decrypt'));
});
