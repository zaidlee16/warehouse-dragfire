import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import Layout from "../components/Layout";
import {
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react"; // Import Divider if not already imported

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.getElementById("title").innerHTML = "All Products";
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("product").select("*");
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (key) => {
    setFilter(key);
  };

  const filteredProducts = filter
    ? products.filter((item) => item.type === filter)
    : products;

  const openModal = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section id="all-products" className="p-4 md:p-10">
          <div className="flex justify-between mb-5 mt-6">
            <h2 className="text-3xl font-bold">All Products</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md p-4">
                <img
                  src={product.img}
                  alt={product.product_name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 mt-1">{product.type}</p>
                <p className="text-xl font-bold mt-2">
                  {formatRupiah(product.price)}
                </p>
                <Button className="mt-4" onClick={() => openModal(product)}>
                  View Details
                </Button>
              </div>
            ))}
          </div>

          <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent className="max-w-md mx-auto">
              <ModalHeader>
                <h2 className="text-lg sm:text-xl font-bold">
                  {selectedProduct?.product_name}
                </h2>
              </ModalHeader>
              <ModalBody>
                {selectedProduct && (
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.product_name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <span className="text-sm p-1 text-gray-400 w-fit capitalize mb-1">
                      {selectedProduct.type}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold mb-2">
                      {formatRupiah(selectedProduct.price)}
                    </h4>

                    <div className="my-5 text-center">
                      <h2 className="font-bold">Description</h2>
                      <Divider className="my-2" />
                      <p className="text-sm">{selectedProduct.description}</p>
                    </div>

                    <div className="mb-4 text-center">
                      <h2 className="font-bold">Total Items</h2>
                      <Divider className="my-2" />
                      <span>{selectedProduct.stock} Items</span>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button auto onPress={onClose}>
                  Back
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </section>
      )}
    </Layout>
  );
};

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export default AllProducts;
