import { useState, useEffect } from 'react'

interface UseS3ImageOptions {
  fallbackUrl?: string
  quality?: number
}

export function useS3Image(
  imagePath?: string | null,
  options: UseS3ImageOptions = {},
) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { fallbackUrl, quality = 100 } = options

  useEffect(() => {
    if (!imagePath) {
      setImageUrl(fallbackUrl || '')
      return
    }

    setIsLoading(true)
    setError(null)

    // If the path is already a full URL, use it directly
    if (imagePath.startsWith('http')) {
      setImageUrl(imagePath)
      setIsLoading(false)
      return
    }

    // Construct the S3 URL from the path
    // You may need to adjust this based on your S3 configuration
    const baseUrl =
      process.env.NEXT_PUBLIC_S3_URL || 'https://sondraw.s3.amazonaws.com'
    const url = `${baseUrl}/${imagePath}${quality < 100 ? `?quality=${quality}` : ''}`

    setImageUrl(url)
    setIsLoading(false)
  }, [imagePath, fallbackUrl, quality])

  return { imageUrl, isLoading, error }
}
