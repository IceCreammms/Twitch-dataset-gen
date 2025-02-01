"use client";

import { useState } from "react";

import Image from "next/image";

import { useWebSocket } from "./context/webSocketContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";
import { LiveChannels } from "@/components/Channels";
export default function DashboardPage() {
  const { data, updateChannels } = useWebSocket();
  const [channelCount, setChannelCount] = useState(10);

  const handleChannelUpdate = () => {
    updateChannels(channelCount);
  };
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalMessages}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalTokens}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Channel number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={channelCount}
                    onChange={(e) => setChannelCount(Number(e.target.value))}
                    className="w-20 border px-2 py-1 rounded"
                  />
                  <Button onClick={handleChannelUpdate}>Update Channels</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardContent>
                <LiveChannels Channels={data.channels} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
