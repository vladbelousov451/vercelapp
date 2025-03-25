import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Progress } from "@/components/ui/progress";




// Fetch news from NewsAPI
async function getFinancialNews() {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: "business",
        apiKey: "c4f1d8f0a0f3491fbc585a3e715e5bed",
        language: "en",
        pageSize: 10,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Top Gainers and Losers data
const marketData = {
  gainers: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      change: "+5.2%",
      ceo: "Tim Cook",
      exchange: "NASDAQ",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      change: "+4.8%",
      ceo: "Elon Musk",
      exchange: "NASDAQ",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      change: "+3.9%",
      ceo: "Satya Nadella",
      exchange: "NASDAQ",
    },
  ],
  losers: [
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      change: "-6.1%",
      ceo: "Ted Sarandos",
      exchange: "NASDAQ",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      change: "-4.3%",
      ceo: "Andy Jassy",
      exchange: "NASDAQ",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      change: "-114.7%",
      ceo: "Sundar Pichai",
      exchange: "NASDAQ",
    },
  ],
};

// Dummy Heatmap Data (reverted to flat array)
const heatmapData = [
  { symbol: "AAPL", change: 5.2 },
  { symbol: "MSFT", change: 3.9 },
  { symbol: "GOOGL", change: -3.7 },
  { symbol: "AMZN", change: -4.3 },
  { symbol: "TSLA", change: 4.8 },
  { symbol: "NFLX", change: -6.1 },
  { symbol: "META", change: 2.5 },
  { symbol: "NVDA", change: 6.0 },
  { symbol: "JPM", change: -1.2 },
  { symbol: "WMT", change: 0.8 },
];

// Dummy Fear and Greed data
const fearAndGreedIndex = 10; // Example value between 0 (Extreme Fear) and 100 (Extreme Greed)

// Main page component
export default async function Home() {
  const newsItems = await getFinancialNews();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Financial News</h1>

      {/* Top Section: Heatmap and Table */}
      <div className="w-full max-w-5xl mb-8">
        {/* Market Heatmap and Fear & Greed Gauge */}
        <div className="flex gap-8 mb-8">
          {/* Market Heatmap */}
          <div className="w-3/4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Market Heatmap</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {heatmapData.map((stock, index) => {
                const changeValue = stock.change;

                // Create a smoother gradient transition based on the percentage change
                const colorIntensity = Math.min(Math.abs(changeValue) * 2, 255); // Make sure intensity doesn't exceed 255
                let backgroundColor = "";

                // Green for gains (positive change)
                if (changeValue >= 0) {
                  backgroundColor = `rgb(0, ${Math.min(150 + colorIntensity, 255)}, 0)`; // Darker green for larger gains
                }
                // Red for losses (negative change)
                else {
                  backgroundColor = `rgb(${Math.min(200 + colorIntensity, 255)}, 0, 0)`; // Darker red for larger losses
                }

                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-sm text-center text-white"
                    style={{ backgroundColor }}
                  >
                    <div className="text-sm font-medium">{stock.symbol}</div>
                    <div className="text-xs">
                      {changeValue > 0 ? "+" : ""}
                      {changeValue.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fear & Greed Gauge */}
          <div className="w-1/4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Fear & Greed Index</h2>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-gray-800 mb-4">{fearAndGreedIndex}</div>
              <Progress
                value={fearAndGreedIndex}
                max={100}
                color={fearAndGreedIndex < 30 ? "bg-red-500" : fearAndGreedIndex < 70 ? "yellow" : "green"}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-600">
                {fearAndGreedIndex < 30
                  ? "Extreme Fear"
                  : fearAndGreedIndex < 70
                  ? "Neutral"
                  : "Extreme Greed"}
              </p>
            </div>
          </div>
        </div>

        {/* Container Wrapping the Tables */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {/* Top Gainers and Losers Table */}
          <div className="space-y-6">
            {/* Top Gainers */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Top Gainers</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead>CEO</TableHead>
                    <TableHead>Exchange</TableHead>
                   
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.gainers.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                            stock.change.startsWith("+")
                              ? "bg-green-500 text-white" // Green background for positive change
                              : "bg-red-500 text-white"   // Red background for negative change
                          }`}
                        >
                          {stock.change}
                        </div>
                      </TableCell>
                      <TableCell>{stock.ceo}</TableCell>
                      <TableCell>{stock.exchange}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Top Losers */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Top Losers</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead>CEO</TableHead>
                    <TableHead>Exchange</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.losers.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                            stock.change.startsWith("+")
                              ? "bg-green-500 text-white" // Green background for positive change
                              : "bg-red-500 text-white"   // Red background for negative change
                          }`}
                        >
                          {stock.change}
                        </div>
                      </TableCell>
                      <TableCell>{stock.ceo}</TableCell>
                      <TableCell>{stock.exchange}</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* News Cards (Matching Table Width) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newsItems.map((item: any, index: number) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                {/* Article Image */}
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg mb-2"
                  />
                )}
                <CardTitle className="text-lg text-gray-700 line-clamp-2">{item.title}</CardTitle>
                {/* Author and Published At Subtitle */}
                <p className="text-sm text-gray-500 mt-1">
                  By {item.author || "Unknown Author"} on{" "}
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString()
                    : "Unknown Date"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-500"
                >
                  Read more
                </a>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No news available at the moment.</p>
        )}
      </div>
    </div>
  );
}
