const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Yeni özellik
        "fix", // Hata düzeltmesi
        "docs", // Dokümantasyon
        "style", // Kod stili değişiklikleri
        "refactor", // Kod yeniden yapılandırması
        "test", // Test değişiklikleri
        "chore", // Genel bakım
        "perf", // Performans iyileştirmeleri
        "ci", // CI yapılandırması
        "build", // Build sistemi değişiklikleri
        "revert", // Geri alma
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-case": [2, "always", ["sentence-case", "lower-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};

export default Configuration;