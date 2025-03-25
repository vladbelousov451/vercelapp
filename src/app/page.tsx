/* eslint-disable  @typescript-eslint/no-explicit-            >
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_KEY = "ed1fc2a935e5dc6cdf9f0fdf0abb38c9"; // API Key directly in the file
const GAINERS_URL = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${API_KEY}`;
const LOSERS_URL = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${API_KEY}`;

interface Stock {
  symbol: string;
  name: string;
  changePercent: number;
}

export default function MarketPage() {
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [gainersRes, losersRes] = await Promise.all([
          axios.get(GAINERS_URL),
          axios.get(LOSERS_URL),
        ]);

        setGainers(gainersRes.data.slice(0, 5)); // Top 5 gainers
        setLosers(losersRes.data.slice(0, 5)); // Top 5 losers
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Stock Market Overview</h1>

      {loading ? (
        <p className="text-lg text-gray-600">Loading market data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Top Gainers Table */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Gainers</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Change (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gainers.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right text-green-600 font-bold">
                      {stock.changePercent.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Top Losers Table */}
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Losers</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Change (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {losers.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell className="text-right text-red-600 font-bold">
                      {stock.changePercent.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
      