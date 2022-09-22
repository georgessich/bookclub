import LoadingSpinner from "./loadingspinner/LoadingSpinner";
const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return  (
      <div style={{position:"absolute", left:"60%", top:"40%"}}>
        Ошибка {error.message}
      </div>
    );
  }
  if (loading) {
    return (
      <div style={{position:"absolute", left:"60%", top:"40%"}}>
        <LoadingSpinner />
      </div>
    );
  }
  if (!data) {
    return <div style={{position:"absolute", left:"60%", top:"40%"}}>
    Ничего не найдено...
  </div>
  }
  if (data) {
    return children;
  }
};

export default QueryResult;
