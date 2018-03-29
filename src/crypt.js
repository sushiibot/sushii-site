const crypto    = require('crypto')
const masterKey = process.env.CRYPT_KEY // 32 byte key length

/**
 * Encrypts a string with AES 256 GCM
 * 
 * @param {string} text String to encrypt
 */
function encrypt(text, encryptionKey = masterKey) {
  try {
    const iv = crypto.randomBytes(16)
    const salt = crypto.randomBytes(64)
    const key = crypto.pbkdf2Sync(encryptionKey, salt, 2145, 32, 'sha512')
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

    // encrypt text
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()

    // generate output
    return Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
  } catch(e) {
    console.error(e)
    return null
  }
}

/**
 * Decrypts a string encrypted with AES 256 GCM
 * 
 * @param {string} encrypted Encrypted base64 encoded data
 */
function decrypt(encrypted, encryptionKey = masterKey) {
  try {
    const decoded = new Buffer(encrypted, 'base64')

    // convert data to buffers
    const salt = decoded.slice(0, 64)
    const iv = decoded.slice(64, 80)
    const tag = decoded.slice(80, 96)
    const text = decoded.slice(96)
    const key = crypto.pbkdf2Sync(encryptionKey, salt, 2145, 32, 'sha512')

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)

    // encrypt the given text
    const decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8')

    return decrypted
  } catch (e) {
    console.error(e)
    return null
  }
}

function generateKey() {
  const initializationVector = crypto.randomBytes(32)
  return initializationVector.toString('base64')
}


module.exports = { encrypt, decrypt, generateKey }
