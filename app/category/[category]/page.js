﻿import { utilFunctions } from "../../../util/functions";
import Product from "../../../componetns/products/Product";

export default async function CategoryPage({ params: { category } }) {
  const res = await fetch(`https://wjdhkznweaesgfaoenbf.supabase.co/rest/v1/products?subcategory=eq.${category}&limit=10`, {
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZGhrem53ZWFlc2dmYW9lbmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MzY3MDEsImV4cCI6MjAwMDQxMjcwMX0.BdLEIavznc3j8TFyy4PxrU6zsFpL1MVvLyDGOKccaUs",
    },
  });
  const data = await res.json();
  const capitalizedData = utilFunctions.capitalizeation(data, "name");
  const capitalizedDataBeforeSecondComma = capitalizedData.map((item) => {
    const capitalizedItem = {
      ...item,
      name: utilFunctions.fetchBeforeSecondComma(item.name),
    };
    return capitalizedItem;
  });

  return (
    <main>
      <Product products={capitalizedDataBeforeSecondComma} category={utilFunctions.removeNumbersAndSpecialChars(category)} />
    </main>
  );
}
