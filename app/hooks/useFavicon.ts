import * as React from "react";

export default function useFavicon(url: string) {
  React.useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon === null) {
      const newFavicon = document.createElement("link");
      newFavicon.setAttribute("rel", "icon");
      newFavicon.setAttribute("type", "image/x-icon");
      newFavicon.setAttribute("href", url);
      document.head.appendChild(newFavicon);
    } else {
      favicon.setAttribute("href", url);
    }
  }, [url]);
}
