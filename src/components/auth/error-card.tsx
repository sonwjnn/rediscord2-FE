import { CardWrapper } from '@/components/auth/card-wrapper'
import { AlertTriangle } from 'lucide-react'

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! something went wrong!"
      headerDescription="Please try again or contact support if the problem persists."
    >
      <div className="flex w-full items-center justify-center">
        <AlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
