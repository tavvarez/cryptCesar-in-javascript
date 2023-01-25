const _ = require('lodash');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function encrypt(message, key) {
    const messageArray = _.toArray(message)
    const encryptedArray = messageArray.map(char => {
        const charCode = char.charCodeAt(0);
        let encryptedCharCode;
        if (charCode >= 65 && charCode <= 90) {
            encryptedCharCode = (charCode + key - 65) % 26 + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            encryptedCharCode = (charCode + key - 97) % 26 + 97;
        } else {
            encryptedCharCode = charCode;
        }
        return String.fromCharCode(encryptedCharCode);
    });
    const encryptedMessage = encryptedArray.join('');
    return encryptedMessage;
}

function decrypt(encryptedMessage, key) {
    const encryptedArray = _.toArray(encryptedMessage);
    const decryptedArray = encryptedArray.map(char => {
        const charCode = char.charCodeAt(0);
        let decryptedCharCode;
        if (charCode >= 65 && charCode <= 90) {
            decryptedCharCode = (charCode - key - 65 + 26) % 26 + 65;
        } else if (charCode >= 97 && charCode <= 122) {
            decryptedCharCode = (charCode - key - 97 + 26) % 26 + 97;
        } else {
            decryptedCharCode = charCode;
        }
        return String.fromCharCode(decryptedCharCode);
    });
    const decryptedMessage = decryptedArray.join('');
    return decryptedMessage;
}

rl.question('Digite a mensagem a ser criptografada ou descriptografada: ', (message) => {
    rl.question('Digite a chave de criptografia (número inteiro): ', (key) => {
        rl.question('Deseja criptografar ou descriptografar a mensagagem? Escreva "c" para criptografar ou "d" para descriptografar: ', (option) => {
            if (option === 'c') {
                const encrypted = encrypt(message, key);
                console.log(encrypted);
            } else if (option === 'd') {
                const decrypted = decrypt(message, key);
                console.log(decrypted);
            } else {
                console.log('Opção inválida, por favor escolha "c" para criptografar ou "d" para descriptografar.');
            }
            rl.close();
        });
    });
});
