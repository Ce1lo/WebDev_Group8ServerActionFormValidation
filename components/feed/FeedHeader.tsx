import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/forms/LogoutButton";
import type { CurrentUser } from "@/lib/types/feed";

type FeedHeaderProps = { currentUser: CurrentUser };

export function FeedHeader({ currentUser }: FeedHeaderProps) {
  return (
    <header className="feed-header">
      <div className="header-inner">
        <div className="feed-brand" aria-label="Nexus Social Network">
          <span className="feed-brand-logo" aria-hidden="true">
            <Image src="/icon.png" alt="" fill priority sizes="44px" />
          </span>
          <span className="feed-brand-copy">
            <strong>Nexus</strong>
            <small>Social Network</small>
          </span>
        </div>
        <div className="user-actions">
          <p>Xin chào, <strong>{currentUser.username}</strong></p>
          <Link href="/feedback" className="feedback-nav-link" style={{ fontSize: "0.9rem", alignSelf: "center" }}>
            Góp ý
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
