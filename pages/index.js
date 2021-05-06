import { useState } from "react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Layout from "../components/Layout";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <StarShips />
      </Layout>
    </QueryClientProvider>
  );
}

async function fetchStarShips({ queryKey }) {

  const [, page] = queryKey;

  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  return response.json();
}

function StarShips() {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(["starships", page], fetchStarShips);

  return (
    <div className="w-full px-40 flex flex-col">
      <h1 className="mx-4 text-2xl font-medium">Starships</h1>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Could not fetch starships.</span>
      ) : (
        <div className="mt-4 w-full flex flex-col space-y-3">
          {data.results.map((item, i) => (
            <div
              key={i}
              className="w-full p-4 flex flex-col space-y-1 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-blue-500 transform hover:shadow hover:-translate-y-1"
            >
              <h3 className="text-xl font-normal">{item.name}</h3>
              <span>Class : {item.starship_class}</span>
              <span className="text-sm">
                Model : {item.model} | Manufacturer : {item.manufacturer}
              </span>
            </div>
          ))}
          <div className="flex justify-center items-center space-x-5">
            <button
              disabled={page === 1}
              className="px-4 py-2 rounded text-blue-500 text-base hover:text-white hover:bg-blue-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                setPage(prev => prev - 1);
              }}
            >
              Prev
            </button>
            <span className="px-4 py-2 bg-blue-500 text-white rounded ">
              {page}
            </span>
            <button
              disabled={isPreviousData || !data.next}
              className="px-4 py-2 rounded text-blue-500 text-base hover:text-white hover:bg-blue-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                setPage(prev => prev + 1);
              }}
            >
              Next
            </button>
          </div>
          {isFetching ? <span> Loading...</span> : null}{' '}
        </div>
      )}
    </div>
  );
}
