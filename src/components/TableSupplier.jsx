import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { supabase } from "../utils/SupaSupplier";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import ModalAddProduct from "./nextui/ModalAddSupplier";
import TablePaginateSupp from "./TablePaginateSupp";
import ModalAddSupplier from "./nextui/ModalAddSupplier";

const TableSupplier = () => {
  const [allBarang, setAllBarang] = useState([]);

  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .order("supplier_id", { ascending: false });
      setAllBarang(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Data Supplier";
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section id="table-supplier" className="p-8">
          <div className="flex justify-between mb-5">
            <h2 className="text-4xl font-bold">Data Supplier</h2>

            <Button color="primary" onPress={onOpen}>
              + Add Supplier
            </Button>
            <ModalAddSupplier isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <TablePaginateSupp allBarang={allBarang} />
        </section>
      )}
    </Layout>
  );
};

export default TableSupplier;
