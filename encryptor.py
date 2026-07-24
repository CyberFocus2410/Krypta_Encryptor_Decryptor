def encrypt_text(text, key):
    result = ""
    for char in text:
        code = ord(char)
        if 'A' <= char <= 'Z':
            result += chr((code - 65 + key) % 26 + 65)
        elif 'a' <= char <= 'z':
            result += chr((code - 97 + key) % 26 + 97)
        elif '0' <= char <= '9':
            result += chr((code - 48 + key) % 10 + 48)
        else:
            result += char
    return result
