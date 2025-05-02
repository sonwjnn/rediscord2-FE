import { CardDescription, CardTitle } from '@/components/ui/card'

interface HeaderProps {
  label?: string
  description?: string
}

export const Header = ({ label, description }: HeaderProps) => {
  return (
    <>
      <CardTitle>{label}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </>
  )
}
