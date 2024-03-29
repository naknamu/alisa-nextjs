"use client";

import { useState, useRef, useEffect } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

export default function Notification() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { data } = useSession();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, [])

  const handleClick = () => {
    router.push("/uploader/mikasa");
  }

  return (
    isClient && (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={data?.user?.name}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            // onNotificationClick={() => handleClick()}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>)
  );
}
