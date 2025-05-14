
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Pages",
      value: "12",
      description: "Main site pages",
      icon: <FileText className="h-6 w-6" />,
      link: "/admin/pages",
    },
    {
      title: "Blog Posts",
      value: "24",
      description: "Published articles",
      icon: <FileText className="h-6 w-6" />,
      link: "/admin/blogs",
    },
    {
      title: "Media Files",
      value: "86",
      description: "Images & documents",
      icon: <Image className="h-6 w-6" />,
      link: "/admin/media",
    },
    {
      title: "SEO",
      value: "36",
      description: "Optimized pages",
      icon: <Search className="h-6 w-6" />,
      link: "/admin/seo",
    },
  ];

  const recentActivities = [
    { title: "Updated homepage hero text", timestamp: "2 hours ago" },
    { title: "Added new blog post about AI", timestamp: "5 hours ago" },
    { title: "Updated SEO meta tags for Services page", timestamp: "Yesterday" },
    { title: "Uploaded 3 new team photos", timestamp: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and update your website content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <Link to={stat.link}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest content updates on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex justify-between border-b pb-2 last:border-0">
                <span>{activity.title}</span>
                <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
          <CardDescription>Helpful information for managing your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>• Upload images in WebP format for better performance</p>
          <p>• Keep page titles under 60 characters for optimal SEO</p>
          <p>• Add alt text to all images for better accessibility and SEO</p>
          <p>• Add FAQ schema to services pages to improve visibility in search</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
