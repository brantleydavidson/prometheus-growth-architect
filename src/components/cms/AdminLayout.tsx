
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";
import { useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <Image className="h-8 w-auto" src="/logo.png" alt="Prometheus Agency" />
              <span className="ml-2 text-lg font-medium hidden sm:inline-block">
                CMS
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm hidden md:block">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <nav className="flex flex-col gap-1 p-4">
            <Link to="/admin" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Dashboard</Link>
            <Link to="/admin/media-library" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Media Library</Link>
            <Link to="/admin/page-editor" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Page Editor</Link>
            <Link to="/admin/blog-editor" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Blog Editor</Link>
            <Link to="/admin/seo-manager" className="text-sm py-2 px-3 hover:bg-muted rounded-md">SEO Manager</Link>
          </nav>
        </aside>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm">
              <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 w-48 border">
                <nav className="flex flex-col gap-2">
                  <Link to="/admin" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Dashboard</Link>
                  <Link to="/admin/media-library" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Media Library</Link>
                  <Link to="/admin/page-editor" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Page Editor</Link>
                  <Link to="/admin/blog-editor" className="text-sm py-2 px-3 hover:bg-muted rounded-md">Blog Editor</Link>
                  <Link to="/admin/seo-manager" className="text-sm py-2 px-3 hover:bg-muted rounded-md">SEO Manager</Link>
                </nav>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
