"use client";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  initial: string;
  onSubmit: (text: string) => void;
}

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";

function EditMessageDialog({ open, setOpen, initial, onSubmit }: Props) {
  const [value, setValue] = useState(initial);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle className="text-[0.85rem]">Edit message</DialogTitle>
        </DialogHeader>

        <div className="pb-0">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here"
            className="w-full min-h-24"
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onSubmit(value)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditMessageDialog;
