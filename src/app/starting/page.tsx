import Header from "@/components/Header";
import Pokemon from "@/components/Pokemon";
import { header } from "@/props/props";

export default function Home() {
  return (
    <>
      <Header text={header.start} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid grid-cols-3 gap-8">
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
          <Pokemon />
        </div>
      </main>
    </>
  );
}
