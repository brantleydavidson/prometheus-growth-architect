
import LoginForm from "@/components/cms/LoginForm";
import SEO from "@/components/SEO";

const LoginPage = () => {
  return (
    <>
      <SEO 
        title="Admin Login - Prometheus Agency CMS" 
        description="Login to the Prometheus Agency content management system."
        canonical="/admin/login"
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;
