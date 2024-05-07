import Header from "./Header";
function Unauthorized() {
  return (
    <div>
      <Header headerText="Hata" motto="Bu sayfaya erişim yetkiniz yok!" />
    </div>
  );
}
export default Unauthorized;
