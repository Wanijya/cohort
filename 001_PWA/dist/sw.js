/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return (
      registry[uri] ||
      new Promise((resolve) => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri =
      nextDefineUri ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = (depUri) => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require,
    };
    registry[uri] = Promise.all(
      depsNames.map((depName) => specialDeps[depName] || require(depName))
    ).then((deps) => {
      factory(...deps);
      return exports;
    });
  };
}
define(["./workbox-5a5d9309"], function (workbox) {
  "use strict";

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute(
    [
      {
        url: "index.html",
        revision: "3117e644b5ab8af9b4beca2f775c7f2b",
      },
      {
        url: "assets/workbox-window.prod.es5-BIl4cyR9.js",
        revision: null,
      },
      {
        url: "assets/index-l43oXHWS.js",
        revision: null,
      },
      {
        url: "assets/index-COcDBgFa.css",
        revision: null,
      },
      {
        url: "icons/fox_icon-128x128.png",
        revision: "114f17cd7a77ad5eb9247a0cba9af613",
      },
      {
        url: "icons/fox_icon-144x144.png",
        revision: "d3e5eea134b33f8cb8e953d2e9f9ed8d",
      },
      {
        url: "icons/fox_icon-152x152.png",
        revision: "a45a84a99d350e7c691a2ec8526277fc",
      },
      {
        url: "icons/fox_icon-192x192.png",
        revision: "703a8ddc49f3162c47648f15e91c1906",
      },
      {
        url: "icons/fox_icon-256x256.png",
        revision: "1b6b529d4f85b9b491090fe46738797d",
      },
      {
        url: "icons/fox_icon-384x384.png",
        revision: "c11304ccefe8d985c84eea7648fabb0a",
      },
      {
        url: "icons/fox_icon-48x48.png",
        revision: "856fa98cac96cd2c6bb2a381cc0d2247",
      },
      {
        url: "icons/fox_icon-512x512.png",
        revision: "75bc1d33b687f9f186a072f6db5499c3",
      },
      {
        url: "icons/fox_icon-72x72.png",
        revision: "b9c65a3dfbac8ddb87b3f9ffaf99bfbe",
      },
      {
        url: "icons/fox_icon-96x96.png",
        revision: "4d228a00cb7af2451ec51a89011f9ffc",
      },
      {
        url: "manifest.webmanifest",
        revision: "89fedc0575a7a4c298e1de0c472c2333",
      },
    ],
    {}
  );
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(
    new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"))
  );
});
