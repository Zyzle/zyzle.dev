import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

function Search() {
  return (
    <DocSearch
      appId="Z2SXNYX68T"
      apiKey="7ca3c2ec540bdd9b0f28b9779e2fa6ec"
      indexName="Blog Crawler"
    />
  );
}

export { Search };
