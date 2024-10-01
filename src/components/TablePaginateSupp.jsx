import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useTruncateText from "../hooks/useTruncateText";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaSupplier";
import Swal from "sweetalert2";

const columns = [
  {
    key: "logo_supplier",
    label: "Logo Supplier",
  },
  {
    key: "supplier_name",
    label: "Supplier Name",
  },
  {
    key: "no_hp",
    label: "No Hp",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "address",
    label: "Address",
  },
  {
    key: "action",
    label: "Actions",
  },
];

export default function TablePaginateSupp({ allBarang = [] }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages =
    allBarang && allBarang.length > 0
      ? Math.ceil(allBarang.length / rowsPerPage)
      : 1;

  const items = React.useMemo(() => {
    if (!allBarang || allBarang.length === 0) return [];

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allBarang.slice(start, end);
  }, [page, allBarang]);

  const { truncateText } = useTruncateText();

  const deleteProductById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await supabase
            .from("supplier")
            .delete()
            .eq("supplier_id", id)
            .select();

          if (data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => window.location.reload());
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.supplier_id}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "action" ? (
                  <div className="relative flex items-center gap-3">
                    <Link to={`/detail-supplier/${item.supplier_id}`}>
                      <Tooltip content="Detail Supplier">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/edit-supplier/${item.supplier_id}`}>
                      <Tooltip content="Change Supplier">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Delete Supplier">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteProductById(item.supplier_id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : columnKey === "no_hp" ? (
                  getKeyValue(item, columnKey)
                ) : columnKey === "address" ? (
                  truncateText(getKeyValue(item, columnKey), 6)
                ) : columnKey === "email" ? (
                  getKeyValue(item, columnKey)
                ) : columnKey === "logo_supplier" ? (
                  <img
                    className=" w-8 "
                    src={getKeyValue(item, columnKey)}
                    alt={getKeyValue(item, "supplier_name")}
                  />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
