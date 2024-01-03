import crypto from 'crypto';

export function sha512(text: string) {
  const sha512 = crypto.createHash('sha512');
  sha512.update(text);
  const hash = sha512.digest('hex');
  return hash;
}
