import PocketBase, { type AuthProviderInfo } from "pocketbase";
import { useSearchParams } from "next/navigation";

import { useEffect } from "react"

const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

export default function Oauth() {
  const redirectUrl = "http://localhost:3000/oauth";

  const searchParams = useSearchParams();

  // parse the query parameters from the redirected url

  // load the previously stored provider's data

  useEffect(() => {

  const providerString: string = localStorage.getItem("provider") ?? "{}";
  if (providerString == null) return;

  const provider: AuthProviderInfo = JSON.parse(
    providerString
  ) as AuthProviderInfo;

  if (provider == null) return;

  // compare the redirect's state param and the stored provider's one
  if (provider.state !== searchParams.get("state")) {
    throw "State parameters don't match.";
  }

  // authenticate
  pb.collection("users")
    .authWithOAuth2Code(
      provider.name,
      searchParams.get("code") ?? "",
      provider.codeVerifier,
      redirectUrl,
      // pass optional user create data
      {
        emailVisibility: false,
      }
    )
    .then((user) => {
      // store the user's data
      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // redirect to the home page
      window.location.href = "/";
    });

  }, [searchParams])

  return <div>Authenticating...</div>;
}
