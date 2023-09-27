import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSupplierApprovalStatusText(status:string | null | undefined){
  if (status === null) return null
  if (status === undefined) return null

  if (status === 'APPROVED'){
    return 'Approved'
  }
  if (status === 'DENIED'){
    return 'Denied'
  }
  if (status === 'PROCESSING'){
    return 'Processing'
  }
  return status;
}