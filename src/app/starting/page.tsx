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

  let [arr, setArr] = useState<string[]>([
    "피카츄1",
    "라이츄2",
    "파이리3",
    "꼬북이4",
  ]);

  let [dragItem, setDragItem] = useState<HTMLDivElement | null>(null);
  let [dropItem, setDropItem] = useState<HTMLDivElement | null>(null);
  let [itemNum, setItemNum] = useState<number | null>(null);
  const handleDrag = (e: any) => {
    //어떤 아이템위로 드래그 되는가?
    const targetItem = e.target;
    console.log(targetItem);
    console.log("현재 어떤 아이템 위로 드래그 시도중인가?: " + targetItem);
    setDropItem(targetItem);
  };
  const nowDragItem = (e: any) => {
    const targetItem = e.target;
    // console.log(targetItem);
    console.log("현재 드래그 중인 아이템: " + targetItem);
    setDragItem(targetItem);
  };
  const dropNow = (e: any) => {
    const targetItem = e.target;
    console.log(dragItem, dropItem);

    //현재 놓아질 자리의 인덱스 찾기
    const filterIndex = arr.findIndex((item, index) => {
      if (dropItem?.innerText === item) {
        console.log(dropItem.innerText);
        return true;
      }
    });
    console.log(filterIndex);

    //현재 드래그하는 박스의 인덱스 찾기
    const dragIndex = arr.findIndex((item, index) => {
      if (dragItem?.innerText === item) {
        console.log(dragItem.innerText);
        return true;
      }
    });
    console.log(dragIndex);

    //arr 순서 바꾸기
    let newArr = [...arr];
    newArr.splice(dragIndex, 1);
    newArr.splice(filterIndex, 0, arr[dragIndex]);
    console.log(newArr);
    setArr(newArr);
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
                  handleDrag(e);
                }}
                onDragStart={(e) => {
                  nowDragItem(e);
                }}
                onDragEnd={(e) => {
                  dropNow(e);
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
