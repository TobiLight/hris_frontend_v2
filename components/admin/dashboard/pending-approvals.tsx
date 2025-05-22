"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PendingApproval } from "@/lib/api/dashboard-service";
import { CalendarClock, DollarSign, FileText } from "lucide-react";

interface PendingApprovalsProps {
  approvals: PendingApproval[];
}

export function PendingApprovals({ approvals }: PendingApprovalsProps) {
  const getApprovalIcon = (type: string) => {
    switch (type) {
      case "leave":
        return <CalendarClock className="h-5 w-5 text-amber-500" />;
      case "expense":
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case "timesheet":
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvals && approvals.length > 0 ? (
            approvals.map((approval) => (
              <div key={approval.id} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  {getApprovalIcon(approval.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={approval.employee.avatar || "/placeholder.svg"}
                          alt={approval.employee.name}
                        />
                        <AvatarFallback>
                          {approval.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">
                        {approval.employee.name}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                    >
                      {approval.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {approval.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Requested on{" "}
                      {new Date(approval.requestDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No pending approvals</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
