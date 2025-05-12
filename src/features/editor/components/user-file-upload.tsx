import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { useUploadUserFile } from '@/features/images/api/use-upload-user-file'
import { UserFileTypeEnum } from '@/features/users/types'

export const UserFileUpload = () => {
  const [progress, setProgress] = useState(0)

  const {
    mutate: uploadFile,
    isPending: uploadFileLoading,
    isError,
    isSuccess,
  } = useUploadUserFile()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (file) {
      uploadFile({ file, fileType: UserFileTypeEnum.DESIGN })
    }
  }

  return (
    <div className="relative w-64">
      <input
        type="file"
        id="fileUpload"
        className="hidden"
        onChange={handleFileUpload}
        disabled={uploadFileLoading}
      />
      <label
        htmlFor="fileUpload"
        className={`
          relative flex items-center justify-center 
          w-full h-12 
          border-2 rounded-lg 
          cursor-pointer 
          transition-all duration-300 
          ${uploadFileLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}
        `}
      >
        {/* Progress bar */}
        {uploadFileLoading && (
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 opacity-30 z-0"
            style={{ width: `${progress}%` }}
          />
        )}

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center">
          <Upload className="mr-2" />
          <span>
            {uploadFileLoading
              ? `Đang tải... ${progress}%`
              : isError
                ? 'Tải lỗi'
                : isSuccess
                  ? 'Tải thành công'
                  : 'Chọn File'}
          </span>
        </div>
      </label>
    </div>
  )
}
