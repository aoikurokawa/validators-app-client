"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cart";
import { useEffect, useState } from "react";

import data from "@/data-735-1.json";

export default function Vaults() {
  const [totalTvlUsd, setTotalTvlUsd] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      total += element.usd_tvl;
    }

    setTotalTvlUsd(total);
    // async function fetchVaults() {
    //   try {
    //     const response = await fetch("/api/vaults"); // Update with your API endpoint
    //     const data = await response.json();
    //     setVaults(data);
    //     setChartData(data.map(v => ({ name: v.name, tvl_usd: v.tvl_usd })));
    //   } catch (error) {
    //     console.error("Failed to fetch vault data", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchVaults();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Card className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
            <CardHeader>
              <CardTitle>Total Restaking TVL (USD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">
                ${totalTvlUsd.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">Total Restaking TVL (USD)</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map(
            (vault) =>
              vault.vrt_mint_symbol && (
                <Card
                  key={vault.vault_pubkey}
                  className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
                >
                  <CardHeader>
                    <CardTitle>{vault.vrt_mint_symbol}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">
                      TVL (Native): {vault.supported_mint_tvl}{" "}
                      {vault.supported_mint_symbol}
                    </p>
                    <p className="text-lg">
                      TVL (USD): ${vault.usd_tvl.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
