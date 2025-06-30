import { useTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Plot from 'react-plotly.js';
import Hero from "@/components/shared/Hero";

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const plotLayout = {
    paper_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    plot_bgcolor: isDark ? '#1a1b1e' : '#ffffff',
    font: {
      color: isDark ? '#ffffff' : '#000000'
    },
    margin: { t: 50, r: 30, l: 60, b: 40 },
    showlegend: true,
    legend: { bgcolor: 'transparent' },
    annotations: [{
      text: 'Bahamas Market Data',
      showarrow: false,
      x: 0.5,
      y: 1.1,
      xref: 'paper' as const,
      yref: 'paper' as const,
      font: {
        size: 14,
        color: isDark ? '#ffffff' : '#000000'
      }
    }]
  };

  // Website Performance Data (Adjusted for Bahamas market)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const websitePerformanceData = {
    users: [5000, 7000, 9000, 11000, 13000, 15000],
    benchmarkUsers: [4500, 6000, 8000, 9500, 11000, 13000],
    bounceRate: [55, 52, 48, 45, 43, 40],
    benchmarkBounce: [58, 56, 54, 52, 50, 48]
  };

  // Social Media Data (Bahamas market engagement rates)
  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  const socialMediaData = {
    engagement: [6.5, 8.0, 4.2, 3.5],
    benchmarkEngagement: [5.0, 6.5, 3.5, 2.8],
    followerGrowth: [1200, 2000, 800, 600],
    postReach: [8000, 12000, 4000, 3000]
  };

  // Email Marketing Data (Bahamas industry averages)
  const emailData = {
    metrics: ['Open Rate', 'Click Rate', 'Conversion'],
    values: [28, 15, 6],
    benchmarks: [22, 12, 4]
  };

  // SEO Performance Data (Bahamas-specific traffic)
  const seoData = {
    dates: months,
    organicTraffic: [2000, 3000, 4500, 6000, 7000, 8000],
    domainAuthority: [25, 28, 30, 32, 34, 35],
    keywords: [20, 25, 30, 35, 40, 45]
  };

  return (
    <div>
      <Hero
        title="Digital Marketing Analytics"
        description="Comprehensive insights into Bahamas digital marketing performance metrics and Caribbean region benchmarks"
        showCTA={false}
      />

      <div className="container mx-auto space-y-6 py-8">
        {/* Website Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic & Conversion Rates</CardTitle>
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
                  name: 'Caribbean Avg Users',
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
            <CardTitle>Social Media Engagement Metrics</CardTitle>
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
                  name: 'Caribbean Avg Engagement %',
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
                  name: 'Caribbean Benchmark',
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
                yaxis: { title: 'Monthly Visitors' },
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
    </div>
  );
}