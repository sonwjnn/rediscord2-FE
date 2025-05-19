interface ToolSidebarHeaderProps {
  title: string
  description?: string
}

export const ToolSidebarHeader = ({
  title,
  description,
}: ToolSidebarHeaderProps) => {
  return (
    <div className="flex items-center border-b border-[#25272c] justify-center space-y-1 rounded-t-md h-[44px] bg-[#16181d]">
      <p className="text-sm font-semibold text-[#8592ad] text-center">
        {title}
      </p>
      {/* {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )} */}
    </div>
  )
}
