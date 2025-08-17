document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling; // 次の要素（コンテンツ）を取得
    const icon = header.querySelector("svg"); // 矢印のアイコンを取得

    // コンテンツの表示・非表示を切り替え
    content.classList.toggle("hidden");
    // 矢印の向きも切り替え
    icon.classList.toggle("rotate-180");

    // aria-expanded属性を更新
    const isExpanded = content.classList.contains("hidden");
    header.setAttribute("aria-expanded", !isExpanded);

    // aria-hidden属性を更新
    content.setAttribute("aria-hidden", isExpanded);

    // 他の項目を閉じる
    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.classList.add("hidden");
        item.setAttribute("aria-hidden", "true");
      }
    });

    // 他の項目の矢印を元に戻す
    document.querySelectorAll(".accordion-header").forEach((otherHeader) => {
      if (otherHeader !== header) {
        const otherIcon = otherHeader.querySelector("svg");
        otherIcon.classList.remove("rotate-180");
        otherHeader.setAttribute("aria-expanded", "false");
        const otherContent = otherHeader.nextElementSibling;
        otherContent.setAttribute("aria-hidden", "true");
      }
    });
  });
});
