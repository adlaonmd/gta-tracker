export default function Footer() {
  let currentYear = new Date().getFullYear();

  return (
    <div className="text-center p-2">
      <small>
        Copyright {currentYear} -{" "}
        <a href="https://github.com/adlaonmde" target="_blank" rel="noreferrer">
          CMD
        </a>
      </small>
    </div>
  );
}
