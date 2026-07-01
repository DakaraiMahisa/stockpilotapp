import fs from "node:fs";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json" with { type: "json" };

countries.registerLocale(enLocale);

const data = Object.entries(
  countries.getNames("en", {
    select: "official",
  }),
)
  .map(([value, label]) => ({
    value,
    label,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const output = `export interface CountryOption {
  value: string;
  label: string;
}

export const COUNTRIES: readonly CountryOption[] = ${JSON.stringify(
  data,
  null,
  2,
)} as const;
`;

fs.mkdirSync("src/lib/constants", { recursive: true });

fs.writeFileSync("src/lib/constants/countries.ts", output, "utf8");

console.log(`✅ Generated ${data.length} countries.`);
