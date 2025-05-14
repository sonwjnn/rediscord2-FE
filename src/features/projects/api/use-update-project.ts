import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Project } from '@/features/projects/types'
import { ENDPOINTS } from '@/features/endpoints'
import privateClient from '@/lib/client/private-client'
import { AxiosResponse } from 'axios'

type BaseUpdateFields = Omit<
  Project,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'name'
>

type ResponseType = AxiosResponse<Project>

type RequestType = BaseUpdateFields & {
  name?: string
}

type MutationContext = {
  previousProject?: ResponseType
  previousProjects?: unknown
}

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType,
    MutationContext
  >({
    mutationKey: ['project', { id }],
    mutationFn: async json => {
      const response = await privateClient.patch<Project>(
        ENDPOINTS.PROJECTS.EDIT_BY_ID(id),
        json,
      )

      return response
    },
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey: ['project', { id }] })
      await queryClient.cancelQueries({ queryKey: ['projects'] })

      const previousProject = queryClient.getQueryData<ResponseType>([
        'project',
        { id },
      ])
      const previousProjects = queryClient.getQueryData(['projects'])

      if (previousProject) {
        queryClient.setQueryData<ResponseType>(['project', { id }], old => {
          return {
            ...old!,
            data: {
              ...old!.data,
              ...newData,
            },
          }
        })
      }

      // Update the project in the projects list if it exists there
      queryClient.setQueriesData({ queryKey: ['projects'] }, (old: any) => {
        if (!old?.pages) return old

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((project: Project) =>
              project.id === id
                ? { ...project, ...newData, updatedAt: new Date() }
                : project,
            ),
          })),
        }
      })

      return { previousProject, previousProjects }
    },
    onSuccess: data => {
      queryClient.setQueryData(['project', { id }], data)
    },
    onError: (error, _, context) => {
      if (context?.previousProject) {
        queryClient.setQueryData(['project', { id }], context.previousProject)
      }
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects)
      }
    },
  })

  return mutation
}
