"use client";
//https://qiita.com/sueasen/items/2a39e709ffac6ff041f5
import Header from "@/components/Header";
import Pokemon from "@/components/Pokemon";
import { header } from "@/props/props";
import { useEffect, useRef, useState } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  const pokemonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nowSelect, setNowSelect] = useState<HTMLDivElement | null>(null);

  const handleRef = (index: number) => (element: HTMLDivElement | null) => {
    pokemonRefs.current[index] = element;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setNowSelect(e.currentTarget);
  };

  useEffect(() => {
    console.log(pokemonRefs);
  }, []);

  //데이터 배열
  let [arr, setArr] = useState<string[]>([
    "피카츄1",
    "라이츄2",
    "파이리3",
    "꼬북이4",
  ]);

  //drag하는 item
  let [dragItem, setDragItem] = useState<HTMLDivElement | null>(null);

  //drop하는 위치에 있는 item
  let [destinationItem, setDestinationItem] = useState<HTMLDivElement | null>(
    null
  );

  //어떤 아이템위로 드래그 되는가?
  const dragDestination = (e: React.DragEvent<HTMLDivElement>) => {
    const targetItem = e.target as HTMLDivElement;
    setDestinationItem(targetItem);
  };

  //현재 드래그 하는 아이템은 무엇인가?
  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const targetItem = e.target as HTMLDivElement;
    setDragItem(targetItem);
  };

  //drop후 데이터를 재정비한다.
  const dropNow = () => {
    // drop 자리의 인덱스 찾기
    const destinationIndex = arr.findIndex(
      (item) => destinationItem?.innerText === item
    );

    // drag 자리의 인덱스 찾기
    const dragIndex = arr.findIndex((item) => dragItem?.innerText === item);

    // arr 순서 바꾸기
    if (
      dragIndex !== -1 &&
      destinationIndex !== -1 &&
      //drag하는 인덱스와 destination 인덱스가 같으면 굳이 실행할 필요가 없다.
      dragIndex !== destinationIndex
    ) {
      let newArr = [...arr];
      //drag 하는 item을 꺼내고, newArr에서 해당 item을 삭제함
      const [draggedItem] = newArr.splice(dragIndex, 1);

      //꺼낸 아이템을 적절한 위치에 넣음
      newArr.splice(destinationIndex, 0, draggedItem);
      setArr(newArr);
    }
  };

  return (
    <>
      <Header text={header.start} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {/* {arr.map((item, i) => {
            return (
              <div
                key={i}
                draggable
                className={`cursor-pointer ${i}`}
                ref={handleRef(i)}
                onClick={handleClick}
              >
                <Pokemon num={i + 1} />
              </div>
            );
          })} */}
          {arr.map((item, i) => {
            return (
              <div
                key={i}
                draggable
                className={`bg-red-100 box-${i + 1} h-[300px]`}
                onDragEnter={(e) => {
                  dragDestination(e);
                }}
                onDragStart={(e) => {
                  dragStart(e);
                }}
                onDragEnd={(e) => {
                  dropNow();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
