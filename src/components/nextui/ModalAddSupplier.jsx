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
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaSupplier";
import Swal from "sweetalert2";

export default function ModalAddSupplier({ isOpen, onOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    supplier_name: "",
    no_hp: "",
    email: "",
    address: "",
    logo_supplier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from("supplier")
        .insert(formData)
        .select();

      if (data) {
        Swal.fire({
          title: "Input Successful",
          text: "Data is successfully input to the database",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Styling inline untuk input
  const inputStyle = {
    border: "none",
    boxShadow: "none",
    outline: "none",
    borderRadius: "0.375rem", // Sesuaikan dengan radius "sm"
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Supplier
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label>
                  Supplier Name
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="supplier_name"
                    style={inputStyle} // Tambahkan inline style
                    value={formData.supplier_name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  No Hp
                  <Input
                    type="number"
                    radius="sm"
                    required
                    name="no_hp"
                    style={inputStyle} // Tambahkan inline style
                    value={formData.no_hp}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="email"
                    style={inputStyle} // Tambahkan inline style
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Logo Supplier
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="logo_supplier"
                    style={inputStyle} // Tambahkan inline style
                    value={formData.logo_supplier}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Address
                  <Textarea
                    radius="sm"
                    required
                    name="address"
                    style={{ ...inputStyle, resize: "none" }} // Tambahkan inline style untuk textarea
                    value={formData.address}
                    onChange={handleChange}
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
