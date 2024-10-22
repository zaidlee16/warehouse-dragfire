import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";
import { form } from "framer-motion/client";

export default function ModalAddProduct({ isOpen, onOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    type: "",
    stock: "",
    img: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const { data } = await supabase.from("product").insert(formData).select();

    //   if (data) {
    //     Swal.fire({
    //       title: "Input Successful",
    //       text: "Data is successfully input to the database",
    //       icon: "success",
    //     }).then(() => {
    //       window.location.reload();
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("imageCatalog")
        .upload(`img_product/${formData.img.name}`, formData.img, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      if (uploadImage) {
        const imageUrl = supabase.storage
          .from("imageCatalog")
          .getPublicUrl(`img_product/${formData.img.name}`).data.publicUrl;

        const updatedFormData = {
          ...formData,
          img: imageUrl,
        };

        const { data, error } = await supabase
          .from("product")
          .insert(updatedFormData)
          .select();

        if (error) {
          throw error;
        }

        if (data) {
          Swal.fire({
            title: "Input Successful",
            text: "Data Successfully Input to Database",
            icon: "success",
          }).then(() => window.location.reload());
        }
      }
    } catch (error) {}
  };

  const jenisBarang = [
    {
      key: "makanan",
      value: "Makanan",
    },
    {
      key: "minuman",
      value: "Minuman",
    },
    {
      key: "atk",
      value: "Atk",
    },
  ];

  const inputStyle = {
    border: "none",
    boxShadow: "none",
    outline: "none",
    borderRadius: "0.375rem",
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Product
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label>
                  Product Name
                  <Input
                    type="text"
                    required
                    name="product_name"
                    style={inputStyle}
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Price
                  <Input
                    type="number"
                    required
                    name="price"
                    style={inputStyle}
                    value={formData.price}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Type
                  <Select
                    radius="sm"
                    required
                    name="type"
                    onChange={handleChange}
                  >
                    {jenisBarang.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </Select>
                </label>
                <label>
                  Stock
                  <Input
                    type="number"
                    required
                    name="stock"
                    style={inputStyle}
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Image
                  <Input
                    type="file"
                    required
                    name="img"
                    onChange={handleImage}
                    className=" w-full border-black p-2 rounded-md "
                  />
                </label>
                <label>
                  Description
                  <Textarea
                    required
                    name="description"
                    style={{ ...inputStyle, resize: "none" }} // Tambahkan gaya untuk textarea
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
