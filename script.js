function showNotification(message) {
    var notification = document.getElementById("notification");
    if (notification) {
        notification.textContent = message;
        setTimeout(function () {
            notification.textContent = "";
        }, 3000);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function () {
            showNotification("Text copied to clipboard successfully!");
        })
        .catch(function (err) {
            console.error('Failed to copy: ', err);
            showNotification("Failed to copy text to clipboard.");
        });
}

function caesarCipher(text, shift) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-z]/i)) {
            var code = text.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}

function vigenereCipher(text, key) {
    var alphabetLength = 26;
    var baseCharCodeUpper = 'A'.charCodeAt(0);
    var baseCharCodeLower = 'a'.charCodeAt(0);
    var result = '';
    for (var i = 0, j = 0; i < text.length; i++) {
        var currentChar = text[i];
        var shift = 0;
        if (/[A-Z]/.test(currentChar)) {
            shift = key[j % key.length].toUpperCase().charCodeAt(0) - baseCharCodeUpper;
            result += String.fromCharCode((currentChar.charCodeAt(0) - baseCharCodeUpper + shift) % alphabetLength + baseCharCodeUpper);
            j++;
        } else if (/[a-z]/.test(currentChar)) {
            shift = key[j % key.length].toLowerCase().charCodeAt(0) - baseCharCodeLower;
            result += String.fromCharCode((currentChar.charCodeAt(0) - baseCharCodeLower + shift) % alphabetLength + baseCharCodeLower);
            j++;
        } else {
            result += currentChar;
        }
    }
    return result;
}

function aesEncrypt(text, key) {
    return btoa(text);
}

function encrypt() {
    var encryptTextField = document.getElementById("encryptText");
    var keyField = document.getElementById("key");
    var shiftField = document.getElementById("shift");
    var cipherMethod = document.getElementById("cipher-method").value;
    var encryptText = encryptTextField.value;
    var key = keyField.value;
    var shift = parseInt(shiftField.value);
    var encryptedText;

    switch (cipherMethod) {
        case 'vigenere':
            encryptedText = vigenereCipher(encryptText, key);
            break;
        case 'caesar':
            encryptedText = caesarCipher(encryptText, shift);
            break;
        case 'aes':
            encryptedText = aesEncrypt(encryptText, key);
            break;
        default:
            encryptedText = encryptText;
    }

    copyToClipboard(encryptedText);
    keyField.value = "";
    shiftField.value = "";
}

function updateInputFields() {
    var cipherMethod = document.getElementById("cipher-method").value;
    var keyContainer = document.getElementById("key-container");
    var shiftContainer = document.getElementById("shift-container");

    if (cipherMethod === 'caesar') {
        keyContainer.style.display = 'none';
        shiftContainer.style.display = 'block';
    } else {
        keyContainer.style.display = 'block';
        shiftContainer.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateInputFields();
});

document.getElementById("show-password").addEventListener("change", function () {
    var encryptTextField = document.getElementById("encryptText");
    var keyField = document.getElementById("key");
    if (this.checked) {
        encryptTextField.type = "text";
        keyField.type = "text";
    } else {
        encryptTextField.type = "password";
        keyField.type = "password";
    }
});