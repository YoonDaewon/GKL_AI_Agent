import { NextResponse } from "next/server";

export async function GET() {
  /**
   * distinguish a request between from a browser or an api request
   * then redirects to specific domain and endpoint if it's from a browser html request
   */
  //   const headersList = await headers();
  //   const acceptHeader = headersList.get("accept") || "";

  //   // If the request is from a browser (accepts HTML)
  //   if (acceptHeader.includes("text/html")) {
  //     // Redirect to the home page or any other specific route
  //     return NextResponse.redirect(
  //       new URL("/", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  //     );
  //   }

  try {
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    /** 
     * disabled catch and return 500 error just in case
    console.error("Health check failed:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
    */
  }
}
