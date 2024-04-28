"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { deleteItem } from "@/app/actions";
import { type Item } from "@/db/edgedb/types";
import { classNames } from "@/src/utils";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Delete item"
      aria-disabled={pending}
      className={classNames(
        pending && "cursor-not-allowed",
        "mt-2 text-sm font-semibold text-red-600",
      )}
    >
      {pending ? (
        <span>Loading...</span>
      ) : (
        <>
          <TrashIcon className="size-4" />
          <span className="sr-only">Delete</span>
        </>
      )}
    </button>
  );
}

export function DeleteItemButton({ itemId }: { itemId: Item["id"] }) {
  const [formState, formAction] = useFormState(deleteItem, {
    success: true,
    message: "",
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="itemId" value={itemId} />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {formState.success}
      </p>
    </form>
  );
}
