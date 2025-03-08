"use client";

import { useEffect, useState } from "react";

export default function UseLayoutEffectParent(props: {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return props.placeholder ? <>{props.placeholder}</> : null;
  }

  return <>{props.children}</>;
}
