import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddItem from "@/components/AddItem";
import { edgedbAuth } from "@/db/edgedb/client";

export default async function New() {
  const isSignedIn = await edgedbAuth.getSession().isSignedIn();
  if (!isSignedIn) {
    redirect(edgedbAuth.getBuiltinUIUrl());
  }

  return (
    <>
      <Link href="/dashboard">
        <button className="text-xs leading-6 text-gray-900">
          <ArrowLeftIcon className="inline-block size-4" /> Back
        </button>
      </Link>
      <div className="mt-4">
        <AddItem />
      </div>
    </>
  );
}
