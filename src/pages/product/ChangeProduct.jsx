import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

const ChangeProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [formEdit, setFormEdit] = useState({
    product_name: "",
    price: 0,
    type: "",
    stock: 0,
    img: "",
    description: "",
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
        .from("product")
        .select("*")
        .eq("id", id)
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
        .from("product")
        .update({
          product_name: formEdit.product_name,
          price: formEdit.price,
          type: formEdit.type,
          stock: formEdit.stock,
          img: formEdit.img,
          description: formEdit.description,
        })
        .eq("id", id)
        .select();

      if (data) {
        Swal.fire({
          title: "Success Changed",
          text: "Data Update Successfully",
          icon: "success",
        }).then(() => navigate("/table"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Change Product";
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section id="change-product" className=" px-6 py-12 sm:px-12 md:px-20 ">
          <form className=" flex flex-col gap-3 " onSubmit={updateBarangById}>
            <label>
              Product Name
              <input
                type="text"
                name="product_name"
                className=" form-input rounded-lg w-full "
                value={formEdit.product_name}
                onChange={handleChange}
              />
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                className=" form-input rounded-lg w-full "
                value={formEdit.price}
                onChange={handleChange}
              />
            </label>

            <label>
              Type
              <select
                name="type"
                className=" form-select rounded-lg w-full "
                value={formEdit.type}
                onChange={handleChange}
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="atk">Atk</option>
              </select>
            </label>

            <label>
              Stock
              <input
                type="number"
                name="stock"
                className=" form-input rounded-lg w-full "
                value={formEdit.stock}
                onChange={handleChange}
              />
            </label>

            <label>
              Image
              <input
                type="text"
                name="img"
                className=" form-input rounded-lg w-full "
                value={formEdit.img}
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                className=" form-textarea rounded-lg w-full "
                onChange={handleChange}
                value={formEdit.description}
              />
            </label>

            <div className=" flex gap-2 ">
              <Button onClick={() => navigate("/table")} color="danger">
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

export default ChangeProduct;
