import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { supabase } from "../integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium"
        >
          Back home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ayush Dev — Android Apps, Websites & Telegram Bots" },
      { name: "description", content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch." },
      { name: "author", content: "Ayush Dev" },
      { property: "og:title", content: "Ayush Dev — Android Apps, Websites & Telegram Bots" },
      { property: "og:description", content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ayush Dev — Android Apps, Websites & Telegram Bots" },
      { name: "twitter:description", content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b61a7e17-8242-42cb-af90-e655d415899c/id-preview-b539c3c4--8e29f80c-10ad-4ef8-a910-fa4ec53fb8f4.lovable.app-1783945719545.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b61a7e17-8242-42cb-af90-e655d415899c/id-preview-b539c3c4--8e29f80c-10ad-4ef8-a910-fa4ec53fb8f4.lovable.app-1783945719545.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthSubscriber() {
  const router = useRouter();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        router.invalidate();
      }
    });
    return () => { data.subscription.unsubscribe(); };
  }, [router]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSubscriber />
      {isAdmin ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1"><Outlet /></main>
          <SiteFooter />
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
