import { useTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Preloader from "@/components/shared/Preloader";

export default function DashboardCharts() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="p-4">
        <ErrorBoundary>
          <div>An error occurred while loading charts.</div>
        </ErrorBoundary>
      </div>
    );
  }

  if (isLoading) {
    return <Preloader />;
  }
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const plotLayout = {
    paper_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    plot_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    font: {
      color: isDark ? '#ffffff' : '#000000'
    },
    margin: { t: 30, r: 20, l: 40, b: 30 },
    showlegend: true,
    legend: { bgcolor: 'transparent' }
  };

  // Website Analytics Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const websiteData = {
    visitors: [5000, 7500, 9000, 12000, 15000, 18000],
    pageviews: [15000, 22500, 27000, 36000, 45000, 54000],
    conversions: [150, 225, 270, 360, 450, 540]
  };

  // Social Media Metrics
  const socialPlatforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const socialData = {
    engagement: [5.2, 6.8, 4.1, 3.5],
    followers: [15000, 22000, 8500, 6000],
    growth: [12, 15, 8, 6]
  };

  // Campaign Performance
  const campaigns = ['Email', 'Social', 'Search', 'Display'];
  const campaignData = {
    roi: [280, 220, 180, 150],
    conversion: [3.2, 2.8, 2.1, 1.8],
    spend: [5000, 4500, 3800, 3200]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: months,
                y: websiteData.visitors,
                type: 'scatter',
                name: 'Visitors',
                line: { color: '#8884d8' }
              },
              {
                x: months,
                y: websiteData.pageviews,
                type: 'scatter',
                name: 'Pageviews',
                line: { color: '#82ca9d' }
              },
              {
                x: months,
                y: websiteData.conversions,
                type: 'scatter',
                name: 'Conversions',
                line: { color: '#ffc658' }
              }
            ]}
            layout={{
              ...plotLayout,
              yaxis: { title: 'Count' }
            }}
            useResizeHandler
            className="w-full h-[300px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: socialPlatforms,
                y: socialData.engagement,
                type: 'bar',
                name: 'Engagement Rate %',
                marker: { color: '#8884d8' }
              },
              {
                x: socialPlatforms,
                y: socialData.growth,
                type: 'scatter',
                name: 'Growth Rate %',
                yaxis: 'y2',
                line: { color: '#82ca9d' }
              }
            ]}
            layout={{
              ...plotLayout,
              yaxis: { title: 'Engagement Rate %' },
              yaxis2: {
                title: 'Growth Rate %',
                overlaying: 'y',
                side: 'right'
              }
            }}
            useResizeHandler
            className="w-full h-[300px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign ROI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: campaigns,
                y: campaignData.roi,
                type: 'bar',
                name: 'ROI %',
                marker: { color: '#8884d8' }
              }
            ]}
            layout={{
              ...plotLayout,
              yaxis: { title: 'ROI %' }
            }}
            useResizeHandler
            className="w-full h-[300px]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                type: 'scatterpolar',
                r: [
                  campaignData.conversion[0],
                  campaignData.roi[0] / 100,
                  campaignData.spend[0] / 1000,
                  socialData.engagement[0]
                ],
                theta: ['Conversion Rate', 'ROI', 'Spend (K)', 'Engagement'],
                fill: 'toself',
                name: 'Email'
              },
              {
                type: 'scatterpolar',
                r: [
                  campaignData.conversion[1],
                  campaignData.roi[1] / 100,
                  campaignData.spend[1] / 1000,
                  socialData.engagement[1]
                ],
                theta: ['Conversion Rate', 'ROI', 'Spend (K)', 'Engagement'],
                fill: 'toself',
                name: 'Social'
              }
            ]}
            layout={{
              ...plotLayout,
              polar: {
                radialaxis: { visible: true, showticklabels: true }
              }
            }}
            useResizeHandler
            className="w-full h-[300px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
