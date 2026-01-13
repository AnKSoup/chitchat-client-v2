//### Handles the logic for hybrid encryption: ###
import crypto from 'crypto'
import { Buffer } from 'buffer'
import { call } from './api-calls'

// ## SYMMETRIC LOGIC
// Uses the built in crypto module from node and the AES-256-GCM algorithm.
// Key is stored with asymmetric encryption in the G_roup_Member table

// Tries to create a key and an iv.
export function createKeyAndIV() {
  try {
    //Buffers as strings for easier storage
    const key = crypto.randomBytes(32).toString('base64')
    const iv = crypto.randomBytes(16).toString('base64')

    return { key: key, iv: iv }
  } catch (error) {
    return error
  }
}

//encrypts a message and retrieve its tag.
export function encryptMessage(message: string, key: string, iv: string) {
  try {
    //Converts base64 strings into buffers
    const keyBuffer = Buffer.from(key, 'base64')
    const ivBuffer = Buffer.from(iv, 'base64')
    //Encrypts the message.
    const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, ivBuffer)
    let result = cipher.update(message, 'utf-8', 'hex')
    result += cipher.final('hex')

    //Is needed for auth inside decryption.
    const tag = cipher.getAuthTag().toString('base64')

    return { message: result, tag: tag }
  } catch (error) {
    return error
  }
}

export function decryptMessage(message: string, key: string, iv: string, tag: string) {
  try {
    //Converts base64 strings into buffers
    const keyBuffer = Buffer.from(key, 'base64')
    const ivBuffer = Buffer.from(iv, 'base64')
    const tagBuffer = Buffer.from(tag, 'base64')

    //Decrypts the message.
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, ivBuffer)

    decipher.setAuthTag(tagBuffer)
    let result = decipher.update(message, 'hex', 'utf-8')
    result += decipher.final('utf-8')

    return { message: result }
  } catch (error) {
    return error
  }
}

//## ASYMMETRIC LOGIC

//Call to get keys here
//Is done only once and you can regenerate some from the user settings
export async function GenerateKeyPair() {
  const result = await call('GET', '/encryption/key_pairs')
  if (result.success) {
    return result.content
  }
}

//Encrypts a symmetric key
export function encryptKey(publicKey: string, key: string) {
  try {
    const myKey = publicKey.replace(/\\n/g, '\n') //Truly escape characters when received from a string
    const encryptedKey = crypto.publicEncrypt(myKey, Buffer.from(key, 'base64'))
    return { key: encryptedKey.toString('base64') }
  } catch (error) {
    return { error: error }
  }
}

//Decrypts a symmetric key
export function decryptKey(privateKey: string, encryptedKey: string) {
  try {
    const myKey = privateKey.replace(/\\n/g, '\n') //Truly escape characters when received from a string
    const decryptedKey = crypto.privateDecrypt(myKey, Buffer.from(encryptedKey, 'base64'))
    return { key: decryptedKey.toString('base64') }
  } catch (error) {
    return { error: error }
  }
}
