import Head from "next/head";

import PocketBase from "pocketbase";



const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
const redirectUrl = "http://localhost:3000/oauth";

async function loadLinks() {
  const authMethods = await pb
    .collection("users")
    .listAuthMethods({ $autoCancel: false });

  const listItems = authMethods.authProviders.map((provider) => {
    // const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = provider.authUrl + redirectUrl;
    a.innerText = provider.name;

    a.dataset.provider = JSON.stringify(provider);

    a.classList.add(
      "bg-white",
      "text-black",
      "p-4",
      "rounded",
      "shadow",
      "hover:bg-gray-100",
      "transition",
      "duration-200"
    );

    a.addEventListener("click", function () {
      localStorage.setItem("provider", this.dataset.provider ?? "{}");
    });

    // li.appendChild(a);
    // return li;
    return a;
  });

  const list = document.getElementById("list");
  if (!list) return;
  list.innerHTML = "";
  listItems.forEach((item) => {
    list.appendChild(item);
  });
}

export default function Home() {
  loadLinks().finally(() => {
    console.log("done");
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-5xl font-extrabold  text-white">
          fucking cool game
        </h1>

        <div id="list" className=" mt-8"></div>
      </main>
    </>
  );
}
