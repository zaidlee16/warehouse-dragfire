import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TablePaginate from "../components/TablePaginate";
import { supabase } from "../utils/SupaClient";
import {
  Button,
  Spinner,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ModalAddProduct from "./nextui/ModalAddProduct";

const TableProduct = () => {
  const [allBarang, setAllBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("product")
        .select("*")
        .order("id", { ascending: false });
      setAllBarang(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Table Product";
  }, []);

  const handleFilterChange = (key) => {
    setFilter(key);
  };

  const filteredBarang = filter
    ? allBarang.filter((item) => item.type === filter)
    : allBarang;

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <section id="table-barang" className="p-8">
          <div className="flex justify-between mb-5">
            <h2 className="text-4xl font-bold">Table Product</h2>
            <Button color="primary" onPress={onOpen}>
              + Add Product
            </Button>
            <ModalAddProduct isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>

          <div className="mb-5">
            <Dropdown>
              <DropdownTrigger>
                <Button color="secondary">
                  {filter ? `Filter: ${filter}` : "Filter by Type"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter Product Types"
                onAction={(key) => handleFilterChange(key)}
              >
                <DropdownItem key="makanan">Makanan</DropdownItem>
                <DropdownItem key="minuman">Minuman</DropdownItem>
                <DropdownItem key="atk">ATK</DropdownItem>
                <DropdownItem key="">All</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <TablePaginate allBarang={filteredBarang} />
        </section>
      )}
    </Layout>
  );
};

export default TableProduct;
