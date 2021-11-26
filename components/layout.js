import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main className="w-full">{children}</main>
      <Footer></Footer>
    </>
  );
}
