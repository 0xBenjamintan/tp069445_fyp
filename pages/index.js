import Link from "next/link";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Clover,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const description =
  "2FA-ENABLED MULTISIG WALLET WITH SEAMLESS SOCIAL & BIOMETRIC LOGINS";

export default function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Clover className="h-6 w-6" />
              <span className="">SAFEBUD</span>
            </Link>
          </div>
          <div className="flex-1">
            <div className="grid px-2 text-sm font-medium lg:px-4 my-8 items-center">
              <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-2">Owner Details</h1>
                <div className="text-md text-muted-foreground">
                  <p>Owner 1: 0x1234...5678</p>
                  <p>Owner 2: 0x8765...4321</p>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold mb-2">Account</h1>
                <div className="text-md text-muted-foreground">
                  <p>Total Balance: 1.5 ETH</p>
                  <p>Transactions: 42</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Code Access</CardTitle>
                <CardDescription>
                  Access the code in this github repository. Built by
                  0xBenjamintan
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  GitHub
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/100 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Clover className="h-6 w-6" />
                  <span className="sr-only">SAFEBUD</span>
                </Link>
                <div className="grid px-2 text-sm font-medium lg:px-4 my-8 items-center">
                  <div className="mb-4">
                    <h1 className="text-2xl font-semibold mb-2">
                      Owner Details
                    </h1>
                    <div className="text-md text-muted-foreground">
                      <p>Owner 1: 0x1234...5678</p>
                      <p>Owner 2: 0x8765...4321</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-semibold mb-2">Account</h1>
                    <div className="text-md text-muted-foreground">
                      <p>Total Balance: 1.5 ETH</p>
                      <p>Transactions: 42</p>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Access</CardTitle>
                    <CardDescription>
                      Access the code in this github repository. Built by
                      0xBenjamintan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      GitHub
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          {/* for spacing purposes */}
          <div className="w-full flex-1"></div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md justify-end">
            test
          </button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Send Transaction
            </h1>
          </div>
          <div className="mb-4">
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Enter address"
                className="w-[auto]"
              />
              <Input
                type="number"
                placeholder="Enter amount"
                className="w-full"
              />
              <Button className="w-full">Send Transaction</Button>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Transaction Record
            </h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-xl font-bold tracking-tight">
                You have no transaction record
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
