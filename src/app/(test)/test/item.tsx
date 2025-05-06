import { useDeleteProject } from '@/features/projects/api/use-delete-project'
import { useDuplicateProject } from '@/features/projects/api/use-duplicate-project'
import { useUpdateProject } from '@/features/projects/api/use-update-project'

type ItemProps = {
  id: string
  name: string
}

export const Item = ({ id, name }: ItemProps) => {
  const { mutateAsync: deleteProject } = useDeleteProject()
  const { mutateAsync: duplicateProject } = useDuplicateProject()
  const { mutateAsync: updateProject } = useUpdateProject(id)

  const handleUpdate = () => {
    updateProject({
      name: 'Updated Name',
      json: '{}',
      height: 100,
      width: 100,
    })
  }

  return (
    <div className="flex items-center gap-2">
      <p>{name}</p>
      <button onClick={() => deleteProject({ id })} className="text-red-500">
        Delete
      </button>
      <button
        onClick={() => duplicateProject({ id })}
        className="text-blue-500"
      >
        Duplicate
      </button>
      <button onClick={handleUpdate} className="text-green-500">
        Update
      </button>
    </div>
  )
}
