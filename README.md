# Krypta - Caesar Cipher Web Application

Krypta is a secure, high-fidelity, blueprint-themed cryptographic web utility designed to demonstrate fundamental cryptographic concepts using the **Caesar Cipher**. It allows users to input text, define a shift key, and securely encrypt or decrypt data following the universal IPO (Input-Process-Output) model.

---

## Features

- **Support for Alphabets and Digits**:
  - Uppercase letters (`A-Z`) are rotated within their 26-character set.
  - Lowercase letters (`a-z`) are rotated within their 26-character set.
  - Digits (`0-9`) are rotated within their 10-character set.
  - Symbols, spaces, and punctuation bypass the cryptographic logic and remain untouched.
- **Stateless Processing**: High-security architecture. Plaintext, ciphertext, and shift keys are processed entirely in-memory and are never logged, cached, or stored on any server or database.
- **CORS Configured**: Fully optimized FastAPI headers ready to handle secure requests from any verified client origin.

---

## How It Works

Krypta operates on a classic Caesar Cipher mathematical model:

1. **Encryption Formula**:  
   $$E_n(x) = (x - \text{offset} + n) \pmod L + \text{offset}$$
   Where:
   - $x$ is the ASCII value of the character.
   - $offset$ is the base ASCII code (65 for `A`, 97 for `a`, 48 for `0`).
   - $n$ is the numeric shift key.
   - $L$ is the character limit set (26 for alphabets, 10 for digits).

2. **Decryption Formula**:  
   $$D_n(x) = (x - \text{offset} - n) \pmod L + \text{offset}$$
   Decryption reverses the shift using subtraction. Python's modulo operator `%` naturally handles negative key wraps correctly.

---

## Project Structure

```text
Krypta_Encryptor_Decryptor/
│
├── static/                     # Frontend Assets (served by backend)
│   ├── index.html              # IPO interface structure
│   ├── style.css               # Blueprint cyber-security visual styling
│   └── app.js                  # Frontend controllers and API communications
│
├── encryptor.py                # Encryption module
├── decryptor.py                # Decryption module
├── main.py                     # FastAPI web server, validations, static route mounts
│
├── Procfile                    # Railway startup command mapping
├── requirements.txt            # Python dependencies (FastAPI, Uvicorn, Pydantic)
├── runtime.txt                 # Specifies the Python version runtime (3.11)
└── README.md                   # Project documentation
```

## Deployment to Railway

This project is configured out-of-the-box for **Railway**:
1. Connect your GitHub repository to [Railway](https://railway.app).
2. Railway detects the `Procfile` and `requirements.txt` configurations automatically.
3. The app is built and served dynamically using Uvicorn.
