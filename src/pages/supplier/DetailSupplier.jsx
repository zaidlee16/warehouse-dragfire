import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaSupplier";
import { Link, useParams } from "react-router-dom";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import { Divider, Spinner } from "@nextui-org/react";

const DetailSupplier = () => {
  const [getProductById, setGetProductById] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getIdProduct = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("supplier_id", id)
        .single();
      setGetProductById(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdProduct();
    document.getElementById("title").innerHTML = "Detail Supplier";
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section className="py-12 px-6 lg:px-40 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
            <img
              src={getProductById.logo_supplier}
              alt="logo_supplier"
              className="w-full lg:w-1/3 object-cover"
            />

            <div className="flex flex-col">
              <h2 className="text-2xl lg:text-4xl font-bold mb-2">
                {getProductById.supplier_name}
              </h2>

              <div className="my-5">
                <h2 className="font-bold">No Hp</h2>
                <Divider className="my-2" />
                <p>{getProductById.no_hp}</p>
              </div>

              <div className="mb-4">
                <h2 className="font-bold">Email</h2>
                <Divider className="my-2" />
                <p>{getProductById.email}</p>
              </div>

              <div className="my-5">
                <h2 className="font-bold">Address</h2>
                <Divider className="my-2" />
                <p>{getProductById.address}</p>
              </div>

              <Link
                className="flex items-center gap-2 bg-cyan-800 duration-300 hover:bg-cyan-950 transition-all text-white p-2 justify-center rounded-lg"
                to={"/data-supplier"}
              >
                Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default DetailSupplier;
