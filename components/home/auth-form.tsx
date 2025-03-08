"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Spinner from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function AuthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="w-full">
      <Input
        value={username}
        className="h-11 text-base placeholder:text-sm"
        placeholder="Room id"
        type="text"
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div className="space-y-3">
        <Button
          className="w-full relative"
          type="submit"
          size="sm"
          onClick={() => {
            setLoading(true);

            if (username && username !== "") {
              router.replace(`/chat?username=${username}`);
            }

            setLoading(false);
          }}
        >
          {loading && (
            <div className="absolute left-3">
              <Spinner />
            </div>
          )}
          <span>Join room</span>
        </Button>
        <Button
          className="w-full relative"
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            setLoading(true);

            if (username && username !== "") {
              router.replace(`/chat?username=${username}`);
            }

            setLoading(false);
          }}
        >
          {loading && (
            <div className="absolute left-3">
              <Spinner />
            </div>
          )}
          <span>Community rooms</span>
        </Button>
      </div>
    </div>
  );
}

export default AuthForm;
