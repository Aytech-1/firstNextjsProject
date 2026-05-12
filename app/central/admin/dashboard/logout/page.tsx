'use client';

import Button from "@/components/ui/button";
import { useModal } from "@/components/ui/modal-provider";

const ExamplePage = () => {
  const { showModal } = useModal();

  const handleDelete = () => {
    showModal({
      variant: "confirmation",
      title: "Delete Record",
      description:
        "Are you sure you want to delete this record? This action cannot be undone.",
      showCancelButton: true,
      cancelText: "Cancel",
      confirmText: "Yes, Delete",
      onConfirm: () => {
        console.log("Record deleted");
      },
    });
  };

  return (
    <Button
      id="delete-btn"
      text="DELETE"
      type="button"
      onClick={handleDelete}
    />
  );
};

export default ExamplePage;