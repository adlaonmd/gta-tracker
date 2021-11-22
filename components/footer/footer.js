export default function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <div className="text-center p-2">
      <small>Copyright {currentYear} - CMD</small>
    </div>
  );
}
