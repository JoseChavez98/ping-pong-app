import { QueryResult } from '@apollo/client'
import { ReactNode } from 'react'

type QueryLoadedFn<T, D> = (data: D) => T
type Options<T> = {
  whenLoading?: T
  whenError?: T
}

interface LoadQueryFn {
  <T extends any = ReactNode, D = any, V = Record<string, any>>(result: QueryResult<D, V>, whenComplete: QueryLoadedFn<T, D>, options: Required<Options<T>>): T
  <T extends any = ReactNode, D = any, V = Record<string, any>>(result: QueryResult<D, V>, whenComplete: QueryLoadedFn<T, D>, options?: Options<T>): T | null
}

export const loadQuery: LoadQueryFn = (result, whenComplete, options) => {
  if (result.loading) {
    return options && options.whenLoading ? options.whenLoading : null
  }

  if (result.error || !result.data) {
    return options && options.whenError ? options.whenError : null
  }

  return whenComplete(result.data)
}

// type PerformMutationArgs<D, V> = {
//   mutation: MutationTuple<D, V>[0]
//   options?: MutationFunctionOptions<D, V>
//   errorMap: ErrorMap
//   setFormError: SubmitHelpers['setFormError']
// }

// export const performMutation = async <D = any, V = {}>({ mutation, options, errorMap, setFormError }: PerformMutationArgs<D, V>) => {
//   try {
//     const result = await mutation(options)
//     return result!
//   } catch (err) {
//     handleMutationFormError(err, { errorMap, setFormError })
//   }
// }
