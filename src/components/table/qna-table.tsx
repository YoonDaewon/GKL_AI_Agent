"use client";

import { useState } from "react";

import { QnA } from "@/domain/agent.domain";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { createColumns, MyFormData } from "./table-column";
import { DataTable } from "./data-table";

const initialData: MyFormData[] = [
  {
    category: "Jane Doe",
    no: "30",
    question: "female",
    answer: "jane@test.com",
  },
];

export function QnaTable({
  qnaList,
  isQnaFetching,
}: {
  qnaList?: QnA[];
  isQnaFetching: boolean;
}) {
  const [data, setData] = useState<MyFormData[]>(initialData);
  const [editingUser, setEditingUser] = useState<MyFormData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns = createColumns();

  const handleCreate = (newRecord: Omit<MyFormData, "id">) => {
    const record = { ...newRecord, id: String(data.length + 1) };
    setData([...data, record]);
    setIsDialogOpen(false);
  };

  const handleUpdate = (updatedUser: MyFormData) => {
    // setData(
    //   data.map((record) =>
    //     record.id === updatedUser.id ? updatedUser : record,
    //   ),
    // );
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    // setData(data.filter((record) => record.id !== id));
  };

  const handlemultiDelete = (users: MyFormData[]) => {
    // const userIds = new Set(users.map((record) => record.id));
    // setData(data.filter((record) => !userIds.has(record.id)));
  };

  const handleEdit = (record: MyFormData) => {
    setEditingUser(record);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="">
      {isQnaFetching ? (
        <TableSkeleton />
      ) : (
        qnaList && (
          <DataTable
            columns={columns}
            data={qnaList}
            onAdd={openCreateDialog}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onmultiDelete={handlemultiDelete}
          />
        )
      )}
    </div>
  );
}
