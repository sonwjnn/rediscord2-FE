export type RandomImage = {
  id: string
  created_at: string
  updated_at: string
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string | null
  blur_hash: string | null
  color: string | null
  description: string | null
  height: number
  likes: number
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
  promoted_at: string | null
  width: number
  user: UnsplashUser
}

type UnsplashUser = {
  id: string
  bio: string | null
  first_name: string
  instagram_username: string | null
  last_name: string | null
  links: {
    followers: string
    following: string
    html: string
    likes: string
    photos: string
    portfolio: string
    self: string
  }
  location: string | null
  name: string
  portfolio_url: string | null
  profile_image: {
    small: string
    medium: string
    large: string
  }
  total_collections: number
  total_likes: number
  total_photos: number
  twitter_username: string | null
  updated_at: string
  username: string
}

export type UserFile = {
  id: string
  path: string
  userId: string
  createdAt: string
  updatedAt: string
}
