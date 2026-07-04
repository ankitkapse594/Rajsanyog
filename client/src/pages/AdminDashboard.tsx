import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Lead, leadStatusValues } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, LogOut, Search, Users, MessageSquare, TrendingUp, CalendarCheck } from "lucide-react";

interface AnalyticsData {
  chatsStarted: number;
  totalLeads: number;
  conversionRate: number;
  meetingsBooked: number;
  popularServices: { purpose: string; count: number }[];
  statusCounts: Record<string, number>;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  in_progress: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  completed: "bg-green-500/15 text-green-500 border-green-500/30",
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const sessionQuery = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/session"],
  });

  useEffect(() => {
    if (sessionQuery.data && !sessionQuery.data.isAdmin) {
      setLocation("/admin/login");
    }
  }, [sessionQuery.data, setLocation]);

  const leadsQuery = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    enabled: !!sessionQuery.data?.isAdmin,
  });

  const analyticsQuery = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics"],
    enabled: !!sessionQuery.data?.isAdmin,
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await apiRequest("PATCH", `/api/leads/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics"] });
      toast({ title: "Lead status updated" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      setLocation("/admin/login");
    },
  });

  const leads = leadsQuery.data || [];

  const purposeOptions = useMemo(() => {
    const set = new Set(leads.map((l) => l.purpose));
    return Array.from(set);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        search.trim() === "" ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.mobile.includes(search) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
      const matchesPurpose = purposeFilter === "all" || lead.purpose === purposeFilter;
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesPurpose && matchesStatus;
    });
  }, [leads, search, purposeFilter, statusFilter]);

  const handleExport = () => {
    window.open("/api/leads/export", "_blank");
  };

  if (sessionQuery.isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!sessionQuery.data?.isAdmin) {
    return null;
  }

  const analytics = analyticsQuery.data;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">Leads Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport} data-testid="button-export-csv">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="ghost"
            onClick={() => logoutMutation.mutate()}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chats Started</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-stat-chats-started">
              {analytics?.chatsStarted ?? "-"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-stat-total-leads">
              {analytics?.totalLeads ?? "-"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-stat-conversion-rate">
              {analytics?.conversionRate ?? "-"}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meetings Booked</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-stat-meetings-booked">
              {analytics?.meetingsBooked ?? "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      {analytics && analytics.popularServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Popular Services</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analytics.popularServices.map((s) => (
              <Badge key={s.purpose} variant="secondary" data-testid={`badge-popular-${s.purpose}`}>
                {s.purpose}: {s.count}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap space-y-0">
          <CardTitle className="text-base">All Leads</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, mobile, email..."
                className="pl-8 w-56"
                data-testid="input-search-leads"
              />
            </div>
            <Select value={purposeFilter} onValueChange={setPurposeFilter}>
              <SelectTrigger className="w-44" data-testid="select-filter-purpose">
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {purposeOptions.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40" data-testid="select-filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {leadStatusValues.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Meeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No leads found.
                  </TableCell>
                </TableRow>
              )}
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} data-testid={`row-lead-${lead.id}`}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.city}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{lead.mobile}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{lead.purpose}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {lead.wantsMeeting ? (
                      <span data-testid={`text-meeting-${lead.id}`}>
                        {lead.meetingDate} {lead.meetingTime}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value) =>
                        statusMutation.mutate({ id: lead.id, status: value })
                      }
                    >
                      <SelectTrigger
                        className={`w-32 h-8 text-xs ${statusColors[lead.status] || ""}`}
                        data-testid={`select-status-${lead.id}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {leadStatusValues.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
