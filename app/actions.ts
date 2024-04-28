"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { edgedbAuth } from "@/db/edgedb/client";
import edgedl from "@/db/edgedb/js";
import { Item } from "@/db/edgedb/types";

export async function handleSignOut() {
  return await edgedbAuth.createServerActions().signout();
}

type ItemState =
  | {
      message?: string;
      success: boolean;
    }
  | {
      message: string;
      success: boolean;
    };

export async function addItem(_: ItemState, formData: FormData) {
  const session = edgedbAuth.getSession();
  const signedIn = await session.isSignedIn();
  if (!signedIn) {
    throw new Error("You must be signed in to perform this action");
  }

  const name = formData.get("name") as Item["name"];
  const res = await edgedl.insert(edgedl.Item, { name }).run(session.client);
  if (res?.id) {
    redirect("/dashboard");
  }

  return {
    success: false,
    message: "Cannot add item",
  };
}

export async function deleteItem(_: ItemState, formData: FormData) {
  const session = edgedbAuth.getSession();
  const signedIn = await session.isSignedIn();
  if (!signedIn) {
    throw new Error("You must be signed in to perform this action");
  }

  const itemId = formData.get("itemId") as Item["id"];
  const res = await edgedl
    .delete(edgedl.Item, () => ({
      filter_single: { id: itemId },
    }))
    .run(session.client);

  if (res?.id) {
    revalidatePath("/dashboard");
  }

  return {
    success: false,
    message: "Cannot delete item",
  };
}
