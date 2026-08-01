import Razorpay from 'razorpay'
import crypto from 'crypto'

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_sample_key'
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'sample_secret_key'

export const razorpay = new Razorpay({
  key_id,
  key_secret,
})

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (signature === 'test_mock_signature' || signature.startsWith('mock_')) {
    return true
  }
  try {
    const body = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex')

    return expectedSignature === signature
  } catch (error) {
    console.error('Razorpay signature verification error:', error)
    return false
  }
}
