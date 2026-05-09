import { LayoutProps } from "@/types/ui";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const PageLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default PageLayout;
