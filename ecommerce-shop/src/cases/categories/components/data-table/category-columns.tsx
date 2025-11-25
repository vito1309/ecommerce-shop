import type { ColumnDef } from "@tanstack/react-table";
import type { CategoryDTO } from "../../dtos/category.dto";
import { DataTableActions } from "@/components/layout/data-table-actions";

export const categoryColumns: ColumnDef<CategoryDTO>[] = [
    {
        accessorKey: 'id',
        header: 'Código'
    },
    {
        accessorKey: 'name',
        header: 'Descrição'
    },
  {
    accessorKey: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex justify-end mr-5">
          <DataTableActions itemId={category.id}></DataTableActions>
        </div>
      )
    }
  }
];