import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import LoadingSkeleton from "../components/nextui/LoadingSkeleton";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [barang, setBarang] = useState(0);
  const [jenisBarangCount, setJenisBarangCount] = useState({});
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const totalBarang = async () => {
    setLoadingSkeleton(true);

    try {
      const countTotalBarang = supabase
        .from("product")
        .select("*", { count: "exact", head: true });

      const jenisBarang = ["makanan", "minuman"];

      const countTotalJenisBarang = jenisBarang.map((jenis) =>
        supabase
          .from("product")
          .select("*", { count: "exact", head: true })
          .eq("type", jenis)
      );

      const results = await Promise.all([
        countTotalBarang,
        ...countTotalJenisBarang,
      ]);

      const totalCount = results[0].count;
      let counts = {};

      results.slice(1).forEach((hasil, index) => {
        counts[jenisBarang[index]] = hasil.count;
      });

      setBarang(totalCount);
      setJenisBarangCount(counts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    totalBarang();
    document.getElementById("title").innerHTML = "Dashboard";
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-4 md:p-10">
        <div className="bg-cyan-800 text-white rounded-lg h-48 md:h-48 p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Welcome, {import.meta.env.VITE_NAMA_USER}!
          </h2>
          <p className="text-sm md:text-lg mt-2">
            Welcome to DragFire Warehouse, your ultimate destination for food,
            beverages, and office supplies. Our warehouse is dedicated to
            providing a diverse selection of high-quality products to meet all
            your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-full">
          {loadingSkeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <div className="p-6 md:p-8 bg-green-500 text-white h-36 md:h-44 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold">
                  Total of All Items
                </h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {barang} Items
                </p>
              </div>
              <div className="p-6 md:p-8 bg-blue-500 text-white h-36 md:h-44 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold">Total Food</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {jenisBarangCount.makanan} Items
                </p>
              </div>
              <div className="p-6 md:p-8 bg-red-500 text-white h-36 md:h-44 rounded-lg">
                <h2 className="text-xl md:text-2xl font-bold">Total Drink</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {jenisBarangCount.minuman} Items
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
