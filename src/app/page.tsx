// "use client";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-gradient-to-br from-yellow-400 via-orange-300 to-red-700">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1"></div>

          <div className="flex flex-1 justify-end">
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
              {"{"}{" "}
              <span className="underline underline-offset-2">Feed!tBack</span>{" "}
              {"}"}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A feedback collection and management system for Growing
              businesses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/admin"
                className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Admin
              </Link>
              <Link
                href="/customer"
                className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Customer
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <main className="flex h-full min-h-screen flex-col items-center justify-between p-24">
    //   <div>
    //     <Button className="m-2">
    //       <Link href={"/customer"}>Visit Customer Page</Link>
    //     </Button>
    //     <Button className="m-2">
    //       <Link href={"/admin"}>Visit Admin Page</Link>
    //     </Button>
    //   </div>
    // </main>
  );
}
