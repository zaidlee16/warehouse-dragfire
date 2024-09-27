import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaSupplier";
import Swal from "sweetalert2";

const ChangeSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formEdit, setFormEdit] = useState({
    supplier_name: "",
    no_hp: 0,
    email: "",
    address: "",
    logo_supplier: "",
  });

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getBarangById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("supplier_id", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBarangById = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .update({
          supplier_name: formEdit.supplier_name,
          no_hp: formEdit.no_hp,
          email: formEdit.email,
          address: formEdit.address,
          logo_supplier: formEdit.logo_supplier,
        })
        .eq("supplier_id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "Success Changed",
          text: "Data Update Successfully",
          icon: "success",
        }).then(() => navigate("/data-supplier"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Change Supplier";
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section id="change-supplier" className="px-6 py-12 lg:px-20 lg:py-12">
          <form className="flex flex-col gap-3" onSubmit={updateBarangById}>
            <label>
              Supplier Name
              <input
                type="text"
                name="supplier_name"
                className="form-input rounded-lg w-full"
                value={formEdit.supplier_name}
                onChange={handleChange}
              />
            </label>

            <label>
              No Hp
              <input
                type="number"
                name="no_hp"
                className="form-input rounded-lg w-full"
                value={formEdit.no_hp}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                type="text"
                name="email"
                className="form-input rounded-lg w-full"
                value={formEdit.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Address
              <textarea
                name="address"
                className="form-textarea rounded-lg w-full"
                onChange={handleChange}
                value={formEdit.address}
              ></textarea>
            </label>

            <label>
              Logo Supplier
              <input
                type="text"
                name="logo_supplier"
                className="form-input rounded-lg w-full"
                value={formEdit.logo_supplier}
                onChange={handleChange}
              />
            </label>

            <div className="flex gap-2">
              <Button onClick={() => navigate("/data-supplier")} color="danger">
                Back
              </Button>
              {loadingBtn ? (
                <Button color="primary" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Change Data
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default ChangeSupplier;
