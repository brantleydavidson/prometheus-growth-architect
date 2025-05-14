import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
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
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/40 hidden md:block">
          <div className="flex flex-col gap-1 p-4">
            <Link to="/admin/media-library" className="text-sm">Media Library</Link>
            <Link to="/admin/page-editor" className="text-sm">Page Editor</Link>
            <Link to="/admin/blog-editor" className="text-sm">Blog Editor</Link>
            <Link to="/admin/seo-manager" className="text-sm">SEO Manager</Link>
          </div>
        </aside>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 shadow-lg">
            <span className="text-lg">Menu</span>
          </Button>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
