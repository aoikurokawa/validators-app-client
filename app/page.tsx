"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cart";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [totalTvlUsd, setTotalTvlUsd] = useState<number>(0);

  return (
    <div className="max-w-3xl mx-auto text-center mt-12">
      <h2 className="text-4xl font-bold mb-4">Welcome to Jito Restaking</h2>
      <p className="text-lg text-gray-400">
        Jito Restaking is a powerful protocol enabling optimized yield
        generation through Solana-based restaking. Explore vaults, track TVL,
        and analyze yield trends.
      </p>
    </div>
  );
}
