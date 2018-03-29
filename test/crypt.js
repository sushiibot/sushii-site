const test = require('ava')
const { encrypt, decrypt, generateKey } = require('../src/crypt')

test('encryption and decryption works', t => {
  const string = 'the mitochondria is the powerhouse of the cell'
  const encryptionKey = generateKey()
  console.log('Encryption key:', encryptionKey)

  const encrypted = encrypt(string, encryptionKey)
  console.log('Encrypted data:', encrypted)

  const decrypted = decrypt(encrypted, encryptionKey)
  console.log('Decrypted string:', encrypted)

  t.is(string, decrypted)
})
