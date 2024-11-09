import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardCharts() {
  // Member Growth Data
  const memberGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Members',
        data: [20, 35, 45, 60, 85, 95],
        borderColor: 'rgb(0, 188, 212)',
        backgroundColor: 'rgba(0, 188, 212, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Event Participation Data
  const eventParticipationData = {
    labels: ['Workshops', 'Seminars', 'Conferences', 'Webinars', 'Networking'],
    datasets: [
      {
        label: 'Participation Rate',
        data: [75, 60, 90, 85, 70],
        backgroundColor: 'rgba(0, 188, 212, 0.7)',
      },
    ],
  };

  // Resource Usage Data
  const resourceUsageData = {
    labels: ['Guides', 'Videos', 'Templates', 'Case Studies'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: [
          'rgba(0, 188, 212, 0.7)',
          'rgba(0, 139, 163, 0.7)',
          'rgba(0, 96, 112, 0.7)',
          'rgba(0, 77, 89, 0.7)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Member Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={memberGrowthData} options={options} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Participation</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={eventParticipationData} options={options} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Resource Usage Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-1/2">
            <Doughnut data={resourceUsageData} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
