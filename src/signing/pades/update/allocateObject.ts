import type { ObjectAllocator } from '../types/ObjectAllocator'

/** The next free object number. */
export const allocateObject = (allocator: ObjectAllocator): number => {
  const num = allocator.next
  allocator.next += 1
  return num
}
