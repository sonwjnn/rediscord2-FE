import Image from 'next/image'
import Link from 'next/link'
import { AlertTriangle, Loader, Search, Upload } from 'lucide-react'
import { useState } from 'react'

import { ActiveTool, Editor } from '@/features/editor/types'
import { ToolSidebarClose } from '@/features/editor/components/tool-sidebar-close'
import { ToolSidebarHeader } from '@/features/editor/components/tool-sidebar-header'

import { useGetImagesByKeyword } from '@/features/images/api/use-get-images-by-keyword'

import { cn, getS3ImageUrlByPath } from '@/lib/utils'
// import { UploadButton } from "@/lib/uploadthing";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetUserFiles } from '@/features/images/api/use-get-user-files'
import { UserFileUpload } from './user-file-upload'

interface ImageSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const [keyword, setKeyword] = useState('cat')
  const [searchInput, setSearchInput] = useState('cat')

  const { data: userFilesData, isLoading: userFilesLoading } = useGetUserFiles()
  const { data, isLoading, isError, refetch } = useGetImagesByKeyword(keyword)

  const images = data?.data || []
  const userFiles = userFilesData?.data || []

  const formmatedUserFiles = userFiles.map(file => {
    return {
      id: file.id,
      url: getS3ImageUrlByPath(file.path),
    }
  })

  const onClose = () => {
    onChangeActiveTool('select')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setKeyword(searchInput.trim())
    }
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'images' ? 'visible' : 'hidden',
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      <div className="p-4">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search images..."
              className="pr-12 h-11 "
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 h-9 w-9 p-0 rounded-md"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <UserFileUpload />
        {/* <UploadButton
          appearance={{
            button: "w-full text-sm font-medium",
            allowedContent: "hidden",
          }}
          content={{
            button: "Upload Image",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        /> */}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            {userFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {formmatedUserFiles.map(image => {
                  return (
                    <button
                      onClick={() => editor?.addImage(image.url)}
                      key={image.id}
                      className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-md overflow-hidden border border-slate-200"
                    >
                      <img
                        src={image.url}
                        alt="User Image"
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="p-4">
            {images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {images.map(image => {
                  return (
                    <button
                      onClick={() => editor?.addImage(image.urls.regular)}
                      key={image.id}
                      className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-md overflow-hidden border border-slate-200"
                    >
                      <img
                        src={image?.urls?.small || image?.urls?.thumb}
                        alt={image.alt_description || 'Image'}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                      <Link
                        target="_blank"
                        href={image.links.html}
                        className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                      >
                        {image.user.name}
                      </Link>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <p className="text-sm">
                  No images found for &quot;{keyword}&quot;
                </p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
