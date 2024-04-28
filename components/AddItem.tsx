"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { addItem } from "@/app/actions";
import { classNames } from "@/src/utils";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) =>
        pending && e.preventDefault()
      }
      aria-label="Add item"
      aria-disabled={pending}
      className={classNames(
        pending && "cursor-not-allowed",
        "rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      {pending ? <span>Loading...</span> : <span>Save</span>}
    </button>
  );
}

export default function AddItem() {
  const [_, formAction] = useFormState(addItem, {
    success: true,
    message: "",
  });

  return (
    <form action={formAction}>
      <div className="space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">New Item</h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="test item"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-6">
        <Link href="/dashboard">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
