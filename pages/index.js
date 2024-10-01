import Link from "next/link";
import { Menu, Clover } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  createThirdwebClient,
  getContract,
  readContract,
  prepareContractCall,
  sendTransaction,
} from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { arbitrumSepolia } from "thirdweb/chains";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CreateTransfer from "@/components/CreateTransfer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";

export const description =
  "2FA-ENABLED MULTISIG WALLET WITH SEAMLESS SOCIAL & BIOMETRIC LOGINS";

const client = createThirdwebClient({
  clientId: "e4fe35424238e85ff5a4d6b33b04e8f5",
});

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(421614),
  address: "0x4cfb068648e454643863303c0A8fE6dE7304B47A",
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
      ],
    },
  }),
];

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [admin1, setAdmin1] = useState(null);
  const [admin2, setAdmin2] = useState(null);
  const [transactionCounter, setTransactionCounter] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const admin1Wallet = useActiveAccount();
  const admin2Wallet = useActiveAccount();

  const isAdmin1 = admin1Wallet?.address === admin1;
  const isAdmin2 = admin2Wallet?.address === admin2;

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await readContract({
          contract,
          method:
            "function fetchTransferRequests() view returns ((address recipient, uint256 value, bool approvedByAdminOne, bool approvedByAdminTwo, bool finalized)[])",
          params: [],
        });
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);
  console.log("tx", transactions);

  // fetch transaction counter
  useEffect(() => {
    async function fetchTransactionCounter() {
      try {
        const data = await readContract({
          contract,
          method: "function transactionCounter() view returns (uint256)",
          params: [],
        });
        setTransactionCounter(data);
      } catch (error) {
        console.error("Error fetching transaction counter:", error);
      }
    }
    fetchTransactionCounter();
  }, []);
  // console.log("tx", transactionCounter);

  // fetch balance
  useEffect(() => {
    async function fetchBalance() {
      try {
        const data = await readContract({
          contract,
          method: "function checkBalance() view returns (uint256)",
          params: [],
        });
        setBalance(ethers.utils.formatEther(data.toString()));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }

    fetchBalance();
  }, []);
  // console.log(balance);

  // fetch admin1 address
  useEffect(() => {
    async function fetchAdmin1() {
      try {
        const data = await readContract({
          contract,
          method: "function admin1() view returns (address)",
          params: [],
        });
        setAdmin1(data);
      } catch (error) {
        console.error("Error fetching admin1:", error);
      }
    }
    fetchAdmin1();
  }, []);

  // fetch admin2 address
  useEffect(() => {
    async function fetchAdmin2() {
      try {
        const data = await readContract({
          contract,
          method: "function admin2() view returns (address)",
          params: [],
        });
        setAdmin2(data);
      } catch (error) {
        console.error("Error fetching admin2:", error);
      }
    }
    fetchAdmin2();
  }, []);

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
                  {admin1 && admin2 ? (
                    <>
                      <p>
                        Owner 1: {admin1.slice(0, 6)}...{admin1.slice(-4)}
                      </p>
                      <p>
                        Owner 2: {admin2.slice(0, 6)}...{admin2.slice(-4)}
                      </p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold mb-2">Account</h1>
                <div className="text-md text-muted-foreground">
                  {balance !== null ? (
                    <p>Balance: {balance} ETH</p>
                  ) : (
                    <p>Loading...</p>
                  )}
                  {transactionCounter !== null ? (
                    <p>Transactions: {transactionCounter}</p>
                  ) : (
                    <p>Loading...</p>
                  )}
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
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    (window.location.href =
                      "https://github.com/0xBenjamintan/tp069445_fyp")
                  }
                >
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
            <div className="block lg:hidden">
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
            </div>
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
                      {admin1 && admin2 ? (
                        <>
                          <p>
                            Owner 1: {admin1.slice(0, 6)}...{admin1.slice(-4)}
                          </p>
                          <p>
                            Owner 2: {admin2.slice(0, 6)}...{admin2.slice(-4)}
                          </p>
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-semibold mb-2">Account</h1>
                    <div className="text-md text-muted-foreground">
                      {balance !== null ? (
                        <p>Balance: {balance} ETH</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                      {transactionCounter !== null ? (
                        <p>Transactions: {transactionCounter}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
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
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        (window.location.href =
                          "https://github.com/0xBenjamintan/tp069445_fyp")
                      }
                    >
                      GitHub
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          {/* for spacing purposes */}
          <div className="w-full flex-1"></div>
          <ConnectButton
            client={client}
            wallets={wallets}
            theme={"light"}
            connectButton={{ label: "Connect Wallet" }}
            connectModal={{
              size: "compact",
              showThirdwebBranding: false,
            }}
            accountAbstraction={{
              chain: arbitrumSepolia, // replace with the chain you want
              sponsorGas: true,
              factoryAddress: "0x96bdAb950e15670c7BB76eBe32CD545177cA78D8",
            }}
          />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <CreateTransfer />
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Transaction Record
            </h1>
          </div>
          <div className="flex flex-1 rounded-lg border border-dashed shadow-sm p-4 lg:p-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Admin 1 Approved</TableHead>
                  <TableHead>Admin 2 Approved</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((tx, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {tx.recipient.slice(0, 6)}...{tx.recipient.slice(-4)}
                    </TableCell>
                    <TableCell>
                      {ethers.utils.formatEther(tx.value)} ETH
                    </TableCell>
                    <TableCell>
                      {tx.approvedByAdminOne === false ? (
                        <Button
                          disabled={!isAdmin1}
                          onClick={async () => {
                            try {
                              const transaction = await prepareContractCall({
                                contract,
                                method:
                                  "function approveTransferRequest(uint256 _requestId)",
                                params: [index],
                              });
                              toast.info("Transaction Pending", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                              const { transactionHash } = await sendTransaction(
                                {
                                  transaction,
                                  account: admin1Wallet,
                                }
                              );
                              toast.success(
                                `Transaction successful with hash:\nhttps://sepolia.arbiscan.io/tx/${transactionHash}`,
                                {
                                  position: "bottom-center",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                }
                              );
                            } catch (error) {
                              console.error(
                                "Error sending transaction:",
                                error
                              );
                              toast.error("Error sending transaction", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                            }
                          }}
                        >
                          Pending
                        </Button>
                      ) : (
                        <Badge variant="secondary">Approved</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {tx.approvedByAdminTwo === false ? (
                        <Button
                          disabled={!isAdmin2}
                          onClick={async () => {
                            try {
                              const transaction = await prepareContractCall({
                                contract,
                                method:
                                  "function approveTransferRequest(uint256 _requestId)",
                                params: [index],
                              });
                              toast.info("Transaction Pending", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                              const { transactionHash } = await sendTransaction(
                                {
                                  transaction,
                                  account: admin1Wallet,
                                }
                              );
                              toast.success(
                                `Transaction successful with hash:\nhttps://sepolia.arbiscan.io/tx/${transactionHash}`,
                                {
                                  position: "bottom-center",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                }
                              );
                            } catch (error) {
                              console.error(
                                "Error sending transaction:",
                                error
                              );
                              toast.error("Error sending transaction", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                            }
                          }}
                        >
                          Pending
                        </Button>
                      ) : (
                        <Badge variant="secondary">Approved</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {tx.finalized ? (
                        <Badge variant="success">Success</Badge>
                      ) : (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
