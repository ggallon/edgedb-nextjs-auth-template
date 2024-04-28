import { redirect } from "next/navigation";
import Link from "next/link";
import { edgedbAuth, edgedbClient } from "@/db/edgedb/client";
import edgedl from "@/db/edgedb/js";
import { Items } from "@/components/Items";

export default async function Dashbord() {
  const isSignedIn = await edgedbAuth.getSession().isSignedIn();
  if (!isSignedIn) {
    redirect(edgedbAuth.getBuiltinUIUrl());
  }

  const items = await edgedl
    .select(edgedl.Item, () => ({
      id: true,
      name: true,
      created: true,
      updated: true,
      created_by: {
        name: true,
        email: true,
      },
    }))
    .run(edgedbClient);

  return (
    <>
      <header className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Items
        </h1>
        <Link href="/dashboard/new">
          <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white">
            + New Item
          </button>
        </Link>
      </header>
      <Items items={items} />
    </>
  );
}
