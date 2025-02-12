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