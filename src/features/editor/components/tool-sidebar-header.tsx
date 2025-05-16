interface ToolSidebarHeaderProps {
  title: string
  description?: string
}

export const ToolSidebarHeader = ({
  title,
  description,
}: ToolSidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-center space-y-1 h-[44px] bg-[#24262b]">
      <p className="text-sm font-semibold text-white text-center">{title}</p>
      {/* {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )} */}
    </div>
  )
}
