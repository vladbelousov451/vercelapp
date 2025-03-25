// pages/stock/[symbol].tsx
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StockEarnings = () => {
  const router = useRouter();
  const { symbol } = router.query; // Get the stock symbol from the URL
  const [earningsData, setEarningsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch earnings data for the stock
  const fetchEarningsData = async (symbol: string) => {
    try {
      const response = await axios.get(`https://api.example.com/earnings/${symbol}`);
      setEarningsData(response.data); // Example: Replace with actual API response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching earnings data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchEarningsData(symbol as string);
    }
  }, [symbol]);

  if (loading) {
    return <div>Loading earnings data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Earnings Data for {symbol}
      </h1>

      {earningsData ? (
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>EPS (Earnings Per Share):</strong> {earningsData.eps}</p>
            <p><strong>Revenue:</strong> ${earningsData.revenue} million</p>
            <p><strong>Quarterly Earnings Date:</strong> {earningsData.date}</p>
            <p><strong>Year-over-Year Growth:</strong> {earningsData.yoyGrowth}%</p>
            <p><strong>Guidance:</strong> {earningsData.guidance}</p>
            {/* Add other earnings data you need */}
          </CardContent>
        </Card>
      ) : (
        <p>No earnings data available.</p>
      )}
    </div>
  );
};

export default StockEarnings;
