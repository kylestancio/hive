'use client'

import { Supplier } from "@prisma/client"
import React, { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { GridOptions, ICellRendererParams } from "ag-grid-community";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuppliersDataTable({rowData, className}:{rowData:Supplier[], className?: string}) {

  const gridRef = useRef<AgGridReact<Supplier>>(null);
  const { theme } = useTheme();
  const router = useRouter();

  const gridOptions: GridOptions<Supplier> = {
    rowData: rowData,
    columnDefs: [
      {
        field: 'Status', 
        cellRenderer: (props: ICellRendererParams<Supplier>) => {
          if (props.value === 'L1APPROVALREQUIRED') {
            return <p><div className="w-2 h-2 rounded-full bg-yellow-400 inline-block me-3"></div>L1 Approval Required</p>
          }
          if (props.value === 'L1APPROVALDENIED') {
            return <p><div className="w-2 h-2 rounded-full bg-red-500 inline-block me-3"></div>L1 Approval Denied</p>
          }
          if (props.value === 'L2APPROVALREQUIRED') {
            return <p><div className="w-2 h-2 rounded-full bg-yellow-400 inline-block me-3"></div>L2 Approval Required</p>
          }
          if (props.value === 'L2APPROVALDENIED') {
            return <p><div className="w-2 h-2 rounded-full bg-red-500 inline-block me-3"></div>L2 Approval Denied</p>
          }
          if (props.value === 'ACTIVE') {
            return <p><div className="w-2 h-2 rounded-full bg-green-500 inline-block me-3"></div>Active</p>
          }
          if (props.value === 'INACTIVE') {
            return <p><div className="w-2 h-2 rounded-full bg-zinc-500 inline-block me-3"></div>Inactive</p>
          }
          return props.value
        }
      },
      {
        field: 'id'
      },
      {
        field: 'name'
      },
      {
        field: 'country'
      },
      {
        field: 'primaryAddress'
      },
      {
        field: 'secondaryAddress'
      },
      {
        field: 'primaryPhone'
      },
      {
        field: 'secondaryPhone'
      },
      {
        field: 'primaryEmail'
      },
      {
        field: 'secondaryEmail'
      },
      { headerName: '',
        width: 100,
        cellClass: 'p-0',
        pinned: 'right',
        cellRenderer: (props:ICellRendererParams<Supplier>) => {
          return (
            <div className="flex gap-2">
              <Button 
                size={"icon"} 
                variant={'ghost'} 
                onClick={()=>router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/suppliers/view/${props.data?.id}`)}>
                <Eye />
              </Button>
              {(props.data?.Status==='L1APPROVALREQUIRED') && 
                <Button 
                  size={"icon"} 
                  variant={'ghost'} 
                  onClick={()=>router.push(`${process.env.NEXT_PUBLIC_NEXT_URL}/suppliers/approve/${props.data?.id}`)}>
                  <CheckCircle2 />
                </Button>
              }
            </div>
          )
        }  
      }
    ],
  }

  return (
    <div className={cn(className, theme==='dark'?'ag-theme-alpine-dark':'ag-theme-alpine')}>
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions}
        />
    </div>
  )
}
