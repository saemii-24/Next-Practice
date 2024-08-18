// components/OptionsMenu.js
import { useSession } from "next-auth/react";

export default function OptionsMenu() {
  const { data: session } = useSession();

  // 사용자의 역할이 'master'인지 확인
  const isMaster = session?.user?.role === "master";

  return (
    <div>
      <h1>Options Menu</h1>
      {/* 전체 삭제 옵션이 'master' 역할 사용자에게만 보이도록 */}
      {isMaster && (
        <button onClick={() => console.log("전체 삭제")}>전체 삭제</button>
      )}
      <button onClick={() => console.log("일반 옵션")}>일반 옵션</button>
    </div>
  );
}
