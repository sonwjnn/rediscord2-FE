import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

import privateClient from '@/lib/client/private-client'
import { ENDPOINTS } from '@/features/endpoints'
import { UserFile } from '../types'
import { useState } from 'react'
import { UserFileTypeEnum } from '@/features/users/types'

type ResponseType = AxiosResponse<UserFile>

export type UploadUserFileRequest = {
  file: File
  fileType: UserFileTypeEnum
}

export const useUploadUserFile = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, UploadUserFileRequest>({
    mutationFn: async ({ file }) => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await privateClient.post<UserFile>(
        ENDPOINTS.USER_FILES.UPLOAD,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return response
    },
    onSuccess: () => {
      toast.success('File uploaded successfully')
      queryClient.invalidateQueries({ queryKey: ['user-files'] })
    },
    onError: () => {
      toast.error('Failed to upload file')
    },
  })

  return mutation
}
