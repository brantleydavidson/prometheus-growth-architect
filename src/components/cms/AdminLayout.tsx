
import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X, Home, FileText, Settings, Image, Search } from "lucide-react";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("cms_authenticated") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated && location.pathname !== "/admin/login") {
    navigate("/admin/login");
    return null;
  }
  
  const handleLogout = () => {
    localStorage.removeItem("cms_authenticated");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };
  
  // Only render the admin layout if authenticated
  if (!isAuthenticated) return <Outlet />;

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <Home className="w-5 h-5" /> },
    { name: "Pages", path: "/admin/pages", icon: <FileText className="w-5 h-5" /> },
    { name: "Blog Posts", path: "/admin/blogs", icon: <FileText className="w-5 h-5" /> },
    { name: "SEO", path: "/admin/seo", icon: <Search className="w-5 h-5" /> },
    { name: "Media Library", path: "/admin/media", icon: <Image className="w-5 h-5" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-16 items-center border-b bg-white px-4 lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col h-full">
              <div className="py-4">
                <h2 className="text-lg font-semibold">Prometheus CMS</h2>
              </div>
              <Separator />
              <div className="flex flex-col space-y-1 mt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="lg:block hidden">
          <Link to="/admin" className="text-lg font-semibold">
            Prometheus CMS
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-sm font-medium"
          >
            Logout
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" target="_blank" className="gap-2">
              <Home className="w-4 h-4" />
              View Site
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 border-r bg-white h-[calc(100vh-4rem)]">
          <div className="flex flex-col space-y-1 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
