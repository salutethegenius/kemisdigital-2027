import { useTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from 'react-plotly.js';

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const plotLayout = {
    paper_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    plot_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    font: {
      color: isDark ? '#ffffff' : '#000000'
    },
    margin: { t: 30, r: 30, l: 60, b: 40 },
    showlegend: true,
    legend: { bgcolor: 'transparent' }
  };

  // Website Performance Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const websitePerformanceData = {
    users: [15000, 17500, 20000, 22500, 25000, 27500],
    pageViews: [45000, 52500, 60000, 67500, 75000, 82500],
    bounceRate: [65, 60, 55, 50, 48, 45],
    benchmarkUsers: [14000, 16000, 18000, 20000, 22000, 24000],
    benchmarkBounce: [70, 68, 65, 63, 60, 58]
  };

  // Social Media Data
  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const socialMediaData = {
    engagement: [4.5, 6.2, 3.8, 2.9],
    benchmarkEngagement: [3.2, 4.8, 2.9, 2.1],
    followerGrowth: [2500, 3800, 1500, 1200],
    postReach: [15000, 22000, 8500, 7000],
    industryReach: [12000, 18000, 7000, 6000]
  };

  // Email Marketing Data
  const emailData = {
    metrics: ['Open Rate', 'Click Rate', 'Conversion'],
    values: [25, 12, 8],
    benchmarks: [22, 10, 6]
  };

  // SEO Performance Data
  const seoData = {
    dates: months,
    organicTraffic: [8000, 10000, 12500, 15000, 18000, 22000],
    domainAuthority: [35, 38, 40, 42, 45, 48],
    topKeywords: [15, 22, 28, 35, 42, 50]
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      {/* Website Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Website Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: months,
                y: websitePerformanceData.users,
                type: 'scatter',
                name: 'Users',
                line: { color: '#0088FE' }
              },
              {
                x: months,
                y: websitePerformanceData.benchmarkUsers,
                type: 'scatter',
                name: 'Industry Avg Users',
                line: { dash: 'dot', color: '#0088FE' },
                opacity: 0.5
              },
              {
                x: months,
                y: websitePerformanceData.bounceRate,
                type: 'scatter',
                name: 'Bounce Rate %',
                yaxis: 'y2',
                line: { color: '#FF8042' }
              }
            ]}
            layout={{
              ...plotLayout,
              yaxis: { title: 'Users' },
              yaxis2: {
                title: 'Bounce Rate %',
                overlaying: 'y',
                side: 'right'
              }
            }}
            useResizeHandler
            className="w-full h-[400px]"
          />
        </CardContent>
      </Card>

      {/* Social Media Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: platforms,
                y: socialMediaData.engagement,
                type: 'bar',
                name: 'Engagement Rate %',
                marker: { color: '#00C49F' }
              },
              {
                x: platforms,
                y: socialMediaData.benchmarkEngagement,
                type: 'bar',
                name: 'Industry Avg Engagement %',
                marker: { color: '#00C49F', opacity: 0.5 }
              }
            ]}
            layout={{
              ...plotLayout,
              barmode: 'group',
              yaxis: { title: 'Engagement Rate %' }
            }}
            useResizeHandler
            className="w-full h-[400px]"
          />
        </CardContent>
      </Card>

      {/* Email Marketing Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Email Marketing Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: emailData.metrics,
                y: emailData.values,
                type: 'bar',
                name: 'Current',
                marker: { color: '#8884D8' }
              },
              {
                x: emailData.metrics,
                y: emailData.benchmarks,
                type: 'bar',
                name: 'Industry Benchmark',
                marker: { color: '#8884D8', opacity: 0.5 }
              }
            ]}
            layout={{
              ...plotLayout,
              barmode: 'group',
              yaxis: { title: 'Percentage (%)' }
            }}
            useResizeHandler
            className="w-full h-[400px]"
          />
        </CardContent>
      </Card>

      {/* SEO Performance */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Plot
            data={[
              {
                x: seoData.dates,
                y: seoData.organicTraffic,
                type: 'scatter',
                name: 'Organic Traffic',
                line: { color: '#82CA9D' }
              },
              {
                x: seoData.dates,
                y: seoData.domainAuthority,
                type: 'scatter',
                name: 'Domain Authority',
                yaxis: 'y2',
                line: { color: '#FFC658' }
              }
            ]}
            layout={{
              ...plotLayout,
              yaxis: { title: 'Organic Traffic' },
              yaxis2: {
                title: 'Domain Authority',
                overlaying: 'y',
                side: 'right'
              }
            }}
            useResizeHandler
            className="w-full h-[400px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
