import crypto from 'crypto'

function verifyPostData(payload: string, sig: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha1', secret)
  const digest = Buffer.from(
    'sha1=' + hmac.update(payload).digest('hex'),
    'utf8'
  )
  const checksum = Buffer.from(sig, 'utf8')
  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    console.log(`Request body digest (${digest}) did not match (${checksum})`)
    return false
  }
  return true
}

export { verifyPostData }
