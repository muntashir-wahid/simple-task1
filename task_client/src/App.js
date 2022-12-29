import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header/Header";
import InfoForm from "./components/InfoForm/InfoForm";
import InfoTable from "./components/InfoTable/InfoTable";

function App() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["userInfos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user-infos");
      const data = await res.json();
      return data;
    },
  });

  // console.log(isLoading, data);

  return (
    <main className="container mx-auto px-4 py-12">
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InfoForm onSaveInfo={refetch} />
        <InfoTable
          userInfos={data}
          isLoading={isLoading}
          onSuccessfullAction={refetch}
        />
      </section>
    </main>
  );
}

export default App;
