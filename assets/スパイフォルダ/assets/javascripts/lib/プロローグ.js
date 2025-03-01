document.addEventListener('DOMContentLoaded', () => {
    let title = document.querySelector('.ruleTitle');
    let ruleTexts = document.querySelectorAll('.ruleText');
    let lastText = document.querySelector('.lastText');

ruleTexts.forEach(ruleText => { console.log(ruleText.textContent); });

    let titleArray = title ? title.textContent.split('') : [];
    let ruleTextArrays = Array.from(ruleTexts).map(ruleText => ruleText.textContent.split(''));
    let lastTextArray = lastText ? lastText.textContent.split('') : [];

    console.log("ruleTextArray",ruleTextArrays);

    title.textContent = ''; // 初期化
    ruleText.textContent = ''; // 初期化
    lastText.textContent = ''; // 初期化

    let combinedArray = [...titleArray, ' ', ...ruleTextArrays, ' ', ...lastTextArray];

    let index = 0;
    let displayInterval = 100; // 表示間隔（ミリ秒）

    function displayNextCharacter() {
        if (index < combinedArray.length) {
            if (index < titleArray.length) {
                title.textContent += combinedArray[index];

            } else if (index < titleArray.length + ruleTextArrays.length + 1) {

                ruleText.textContent += combinedArray[index];
            }
            else {
                lastText.textContent += combinedArray[index];
            }
            index++;
            setTimeout(displayNextCharacter, displayInterval);
        }
    }

    displayNextCharacter(); // 関数呼び出しを追加
});
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function SpyMissionFooter() {
  const [footerVisible, setFooterVisible] = useState(false)
  const [unlockedItems, setUnlockedItems] = useState(0)

  useEffect(() => {
    const storedUnlockedItems = localStorage.getItem("unlockedItems")
    if (storedUnlockedItems) {
      setUnlockedItems(Number.parseInt(storedUnlockedItems))
      setFooterVisible(true)
    }
  }, [])

  const handleQRScan = () => {
    if (!footerVisible) {
      setFooterVisible(true)
      setUnlockedItems(1)
    } else {
      setUnlockedItems((prev) => Math.min(prev + 1, 5))
    }
    localStorage.setItem("unlockedItems", unlockedItems + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* ここにメインコンテンツを配置 */}
        <h1 className="text-2xl font-bold mb-4">スパイミッション</h1>
        <Button onClick={handleQRScan}>QRコードをスキャン（シミュレーション）</Button>
      </main>

      {footerVisible && (
        <footer className="bg-gray-800 text-white p-4">
          <ol className="flex justify-around">
            {["プロローグ", "ミッション1", "ミッション2", "ミッション3", "ミッション4"].map(
              (item, index) =>
                index < unlockedItems && (
                  <li key={index} className="px-2">
                    <a href={`#${item}`} className="hover:underline">
                      {item}
                    </a>
                  </li>
                ),
            )}
          </ol>
        </footer>
      )}
    </div>
  )
}