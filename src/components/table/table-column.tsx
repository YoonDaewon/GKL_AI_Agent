"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface MyFormData {
  category: string;
  no: string;
  question: string;
  answer: string;
}

interface ColumnActions {
  onEdit?: (data: MyFormData) => void;
  onDelete?: (id: string) => void;
}

export const createColumns = (): ColumnDef<MyFormData>[] => {
  const columns: ColumnDef<MyFormData>[] = [
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "no",
      header: "no",
      enableSorting: false,
    },
    {
      accessorKey: "question",
      header: "Question",
      enableSorting: false,
    },
    {
      accessorKey: "answer",
      header: "Answer",
      enableSorting: false,
    },
  ];

  //   columns.push({
  //     id: "actions",
  //     cell: ({ row, table }) => {
  //       const record = row.original;
  //       const { onEdit, onDelete } = table.options.meta as ColumnActions;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="size-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="size-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>

  //             {onEdit && (
  //               <DropdownMenuItem onClick={() => onEdit(record)}>
  //                 Edit
  //               </DropdownMenuItem>
  //             )}

  //             {onDelete && (
  //               <DropdownMenuItem onClick={() => onDelete(record.id)}>
  //                 Delete
  //               </DropdownMenuItem>
  //             )}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   });

  return columns;
};
