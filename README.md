# Krypta - Caesar Cipher Web Application

Krypta is a secure, high-fidelity, blueprint-themed cryptographic web utility designed to demonstrate fundamental cryptographic concepts using the **Caesar Cipher**. It allows users to input text, define a shift key, and securely encrypt or decrypt data following the universal IPO (Input-Process-Output) model.

---

## Features

- **Aesthetic Cyber-Security Theme**: A dark navy blue dashboard featuring active cyber grid overlays, terminal monospace fonts, and interactive glassmorphic panels.
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
├── encryptor.py                # Humanized encryption module
├── decryptor.py                # Humanized decryption module
├── main.py                     # FastAPI web server, validations, static route mounts
│
├── Procfile                    # Railway startup command mapping
├── requirements.txt            # Python dependencies (FastAPI, Uvicorn, Pydantic)
├── runtime.txt                 # Specifies the Python version runtime (3.11)
└── README.md                   # Project documentation
```

---

## How to Run Locally

### Prerequisites
Make sure you have Python 3.10+ installed.

### 1. Install Dependencies
Install the required packages specified in `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 2. Start the FastAPI Server
Run the application locally using Python directly:
```bash
python main.py
```
This runs the local development server at `http://127.0.0.1:8000`.

### 3. Open in Browser
Open your browser and navigate to:
```text
http://127.0.0.1:8000
```

---

## API Specifications

Krypta exposes a single RESTful endpoint to handle cryptographic workloads:

### **POST `/api/process`**

- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "text": "Hello World 123!",
    "key": 3,
    "action": "encrypt"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "status": "success",
    "original_text": "Hello World 123!",
    "processed_text": "Khoor Zruog 456!"
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "status": "error",
    "message": "Invalid key value. Key must be an integer."
  }
  ```

---

## Deployment to Railway

This project is configured out-of-the-box for **Railway**:
1. Connect your GitHub repository to [Railway](https://railway.app).
2. Railway detects the `Procfile` and `requirements.txt` configurations automatically.
3. The app is built and served dynamically using Uvicorn.
