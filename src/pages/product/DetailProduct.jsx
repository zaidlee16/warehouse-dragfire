import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaClient";
import { Link, useParams, useLocation } from "react-router-dom";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import { Divider, Spinner } from "@nextui-org/react";

const DetailProduct = () => {
  const [getProductById, setGetProductById] = useState({});
  const [loading, setLoading] = useState(false);
  const { formatRupiah } = useFormatRupiah();
  const { id } = useParams();
  const location = useLocation(); // Use useLocation to access state

  const getIdProduct = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
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
    document.getElementById("title").innerHTML = "Detail Product";
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner className="flex justify-center items-center h-screen" />
      ) : (
        <section className=" py-12 px-6 sm:px-12 md:px-24 lg:px-40 ">
          <div className=" flex flex-col lg:flex-row gap-6 lg:gap-16">
            <img
              src={getProductById.img}
              alt="img"
              className=" w-full lg:w-[300px] h-auto object-cover"
            />

            <div className=" flex flex-col ">
              <span className=" text-sm p-1 text-gray-400 w-fit capitalize mb-1 ">
                {getProductById.type}
              </span>
              <h2 className=" text-2xl sm:text-3xl md:text-4xl font-bold mb-2 ">
                {getProductById.product_name}
              </h2>

              <h4 className=" text-3xl sm:text-4xl md:text-6xl font-bold mb-4 ">
                {formatRupiah(getProductById.price)}
              </h4>

              <div className=" my-5 ">
                <h2 className=" font-bold ">Description</h2>
                <Divider className=" my-2 " />
                <p>{getProductById.description}</p>
              </div>

              <div className=" mb-4 ">
                <h2 className=" font-bold ">Total Items</h2>
                <Divider className=" my-2 " />
                <span>{getProductById.stock} Items</span>
              </div>

              <Link
                className=" flex items-center gap-2 bg-cyan-800 duration-300 hover:bg-cyan-950 transition-all text-white p-2 justify-center rounded-lg "
                to={"/table"}
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

export default DetailProduct;
