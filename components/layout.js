import Footer from "./footer/footer";
import Loading from "./loading/loading";
import Navbar from "./navbar/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
}
