import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Check,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  Globe,
  Inbox,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adminLogin,
  deleteAdminInquiry,
  getAdminInquiries,
  verifyAdminSession,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "NovaCraft Admin Portal — Inquiry Control Center" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

export type InquiryRow = {
  id: string;
  created_at: string;
  contact_name: string;
  business_name: string;
  email: string;
  services: string[];
  business_context: string;
  project_details: string;
  consent: boolean;
  source: string;
};

// Fallback sample inquiries for testing when database is in local development mode without service keys
const SAMPLE_INQUIRIES: InquiryRow[] = [
  {
    id: "sample-1",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    contact_name: "Elena Rostova",
    business_name: "Nordic Ceramic Studio",
    email: "elena@nordicceramics.example",
    services: ["Website creation"],
    business_context: "Current online presence: instagram.com/nordicceramics",
    project_details:
      "We want to build a refined 4-page website to showcase our handmade stoneware and allow boutique hotels to request trade pricing directly.",
    consent: true,
    source: "website",
  },
  {
    id: "sample-2",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    contact_name: "Julian Meyer",
    business_name: "Apex Logistics & Freight",
    email: "julian.meyer@apexlogistics.example",
    services: ["Website creation", "Social media advice"],
    business_context: "Current online presence: apexlogistics.de",
    project_details:
      "Our current site was built 6 years ago and looks dated on mobile phones. Need clear service pages for warehousing and express freight, plus an easy quote form.",
    consent: true,
    source: "website",
  },
  {
    id: "sample-3",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    contact_name: "Marco Silva",
    business_name: "Silva Architecture & Interiors",
    email: "m.silva@silva-arch.example",
    services: ["Social media management"],
    business_context: "Direct inquiry for NovaCraft services.",
    project_details:
      "Looking for monthly guidance and curation for our Instagram and LinkedIn portfolio channels to reach commercial developers.",
    consent: true,
    source: "website",
  },
];

const STORAGE_KEY = "novacraft_admin_token";
const STORAGE_USER_KEY = "novacraft_admin_user";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [initializing, setInitializing] = useState(true);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard state
  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Check saved session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEY);
        const savedUser = localStorage.getItem(STORAGE_USER_KEY);
        if (savedToken) {
          const res = await verifyAdminSession({ data: { token: savedToken } });
          if (res.valid) {
            setToken(savedToken);
            setCurrentUser(res.username || savedUser || "novacraft_admin");
          } else {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_USER_KEY);
          }
        }
      } catch (err) {
        console.error("Session verification error:", err);
      } finally {
        setInitializing(false);
      }
    };

    checkSession();
  }, []);

  // Fetch inquiries when token is available
  const fetchInquiries = async (sessionToken: string) => {
    setLoadingInquiries(true);
    setFetchError(null);
    try {
      const res = await getAdminInquiries({ data: { token: sessionToken } });
      setDbConnected(res.isConnected);
      if (res.isConnected && res.inquiries) {
        setInquiries(res.inquiries as InquiryRow[]);
        setUsingSampleData(false);
      } else {
        setFetchError(res.error || "Database credentials missing in environment.");
        // If empty or disconnected in development, supply sample inquiries for verification
        setInquiries(SAMPLE_INQUIRIES);
        setUsingSampleData(true);
      }
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error loading inquiries:", err);
      setFetchError(err instanceof Error ? err.message : "Failed to load inquiries");
      setInquiries(SAMPLE_INQUIRIES);
      setUsingSampleData(true);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiries(token);
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    try {
      const res = await adminLogin({
        data: {
          username: username.trim(),
          password,
        },
      });

      if (res.success && res.token) {
        setToken(res.token);
        setCurrentUser(res.username);
        localStorage.setItem(STORAGE_KEY, res.token);
        localStorage.setItem(STORAGE_USER_KEY, res.username);
      }
    } catch (err) {
      console.error("Login failure:", err);
      setLoginError(
        err instanceof Error
          ? err.message
          : "Invalid username or password. Please verify credentials.",
      );
    } finally {
      setLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken(null);
    setCurrentUser("");
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_USER_KEY);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;

    setDeletingId(id);
    try {
      if (usingSampleData) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } else {
        await deleteAdminInquiry({ data: { token, id } });
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete record.");
    } finally {
      setDeletingId(null);
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Export CSV
  const exportToCSV = () => {
    if (inquiries.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Contact Name",
      "Email",
      "Business Name",
      "Services",
      "Online Presence",
      "Inquiry Details",
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.created_at).toLocaleString()}"`,
      `"${inq.contact_name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.business_name.replace(/"/g, '""')}"`,
      `"${inq.services.join(", ")}"`,
      `"${inq.business_context.replace(/"/g, '""')}"`,
      `"${inq.project_details.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `novacraft_inquiries_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered & Sorted Inquiries
  const filteredInquiries = useMemo(() => {
    let result = [...inquiries];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.contact_name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.business_name.toLowerCase().includes(q) ||
          i.project_details.toLowerCase().includes(q) ||
          i.business_context.toLowerCase().includes(q),
      );
    }

    if (serviceFilter !== "ALL") {
      result = result.filter((i) => i.services.some((s) => s.includes(serviceFilter)));
    }

    result.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return sortOrder === "NEWEST" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [inquiries, searchQuery, serviceFilter, sortOrder]);

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#03060a] text-slate-300">
        <div className="flex items-center gap-3">
          <RefreshCw className="size-5 animate-spin text-cyan-400" />
          <span className="font-mono text-sm">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 1. LOGIN GATE
  // =========================================================================
  if (!token) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#03060a] px-5 py-12 text-slate-100">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Brand header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <BrandLogo size="lg" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono text-cyan-300">
              <Shield className="size-3.5 text-cyan-400" />
              <span>Admin Portal · Secure Access</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-white tracking-tight">
              Inquiry Control Center
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Sign in with your administrator credentials to manage inquiries.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/15 bg-black/80 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
            {loginError && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs sm:text-sm text-red-300">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label
                  htmlFor="admin-username"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Admin Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    id="admin-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin or novacraft_admin"
                    autoFocus
                    required
                    className="pl-10 border-white/20 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="admin-password"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="pl-10 pr-10 border-white/20 bg-white/5 text-white placeholder:text-slate-500 focus-visible:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loggingIn}
                className="w-full h-11 bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20"
              >
                {loggingIn ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span>Unlock Admin Panel</span>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-400">
                Encrypted session with HMAC-SHA256 signature and rate limiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#03060a] text-slate-100">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060c18]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" />
            <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Inquiry Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block font-mono text-xs text-slate-400">
              Logged in: <strong className="text-white">{currentUser}</strong>
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => token && fetchInquiries(token)}
              disabled={loadingInquiries}
              className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 text-xs h-9"
              title="Refresh inquiries"
            >
              <RefreshCw className={`size-3.5 mr-1.5 ${loadingInquiries ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={inquiries.length === 0}
              className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 text-xs h-9"
              title="Download CSV"
            >
              <Download className="size-3.5 mr-1.5 text-cyan-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-300 hover:text-red-400 text-xs h-9 hover:bg-red-500/10"
            >
              <LogOut className="size-3.5 mr-1.5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-12">
        {/* Status notice if in preview/sample mode */}
        {usingSampleData && (
          <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-amber-200 flex items-start justify-between gap-4">
            <div>
              <strong className="font-semibold block text-amber-300">
                Notice: Displaying demonstration records.
              </strong>
              <span>
                {fetchError
                  ? `Supabase status: ${fetchError}`
                  : "Database service key not set in environment."}{" "}
                To connect to live customer inquiries, ensure{" "}
                <code className="bg-amber-950/60 px-1 py-0.5 rounded font-mono text-xs">
                  SUPABASE_SERVICE_ROLE_KEY
                </code>{" "}
                is saved in your project environment secrets.
              </span>
            </div>
            <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-mono text-amber-300 border border-amber-400/30 shrink-0">
              Demo Mode
            </span>
          </div>
        )}

        {/* Dashboard Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Client Inquiries & Outreach Responses
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              All website and social media inquiries received from prospect campaigns.
            </p>
          </div>

          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="size-3.5 text-cyan-400" />
              <span>Last checked: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {/* Overview Stats Cards */}
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#060c18] p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Total Inquiries
            </span>
            <div className="mt-2 text-3xl font-bold font-display text-white">
              {inquiries.length}
            </div>
            <p className="mt-1 text-xs text-slate-400">Lifetime inquiries logged</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#060c18] p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
              Website Creation
            </span>
            <div className="mt-2 text-3xl font-bold font-display text-white">
              {inquiries.filter((i) => i.services.some((s) => s.includes("Website"))).length}
            </div>
            <p className="mt-1 text-xs text-slate-400">Primary service requests</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#060c18] p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">
              Social Media Support
            </span>
            <div className="mt-2 text-3xl font-bold font-display text-white">
              {inquiries.filter((i) => i.services.some((s) => s.includes("Social"))).length}
            </div>
            <p className="mt-1 text-xs text-slate-400">Advice & management</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#060c18] p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
              Database Sync
            </span>
            <div className="mt-2 flex items-center gap-2 text-lg font-bold text-white">
              <span
                className={`size-3 rounded-full ${dbConnected ? "bg-emerald-400" : "bg-amber-400"}`}
              />
              <span>{dbConnected ? "Connected" : "Local Mock"}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {dbConnected ? "Direct Supabase connection" : "Awaiting service role key"}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 rounded-xl border border-white/10 bg-[#060c18]/80 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company, or message..."
              className="pl-10 h-10 border-white/15 bg-white/5 text-sm text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Service Filters */}
            <div className="flex items-center gap-1.5 border border-white/10 bg-white/5 p-1 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setServiceFilter("ALL")}
                className={`px-3 py-1 rounded transition-colors ${
                  serviceFilter === "ALL"
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setServiceFilter("Website")}
                className={`px-3 py-1 rounded transition-colors ${
                  serviceFilter === "Website"
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Websites
              </button>
              <button
                type="button"
                onClick={() => setServiceFilter("Social")}
                className={`px-3 py-1 rounded transition-colors ${
                  serviceFilter === "Social"
                    ? "bg-cyan-500 text-black font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Social
              </button>
            </div>

            {/* Sort Order */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "NEWEST" ? "OLDEST" : "NEWEST")}
              className="h-9 border-white/15 bg-white/5 text-xs text-slate-300 hover:text-white"
            >
              <ArrowUpDown className="size-3.5 mr-1 text-cyan-400" />
              <span>{sortOrder === "NEWEST" ? "Newest First" : "Oldest First"}</span>
            </Button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredInquiries.length}</strong> of{" "}
            {inquiries.length} inquiries
          </span>
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-cyan-400 hover:underline">
              Clear search
            </button>
          )}
        </div>

        {/* Inquiries List */}
        <div className="mt-4 space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#060c18] p-12 text-center">
              <Inbox className="mx-auto size-12 text-slate-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">No inquiries found</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
                {searchQuery
                  ? "No submissions match your current search query. Try clearing your filters."
                  : "No client inquiries have been submitted yet."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-6 border-white/20 text-white"
                >
                  Reset filters
                </Button>
              )}
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const formattedDate = new Date(inq.created_at).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              });

              const replySubject = encodeURIComponent(
                `Regarding your NovaCraft inquiry — ${inq.business_name || inq.contact_name}`,
              );
              const replyBody = encodeURIComponent(
                `Hi ${inq.contact_name},\n\nThank you for reaching out to NovaCraft. We reviewed your inquiry regarding:\n"${inq.project_details}"\n\n`,
              );
              const mailtoUrl = `mailto:${inq.email}?subject=${replySubject}&body=${replyBody}`;

              const summaryText = `Name: ${inq.contact_name}\nEmail: ${inq.email}\nBusiness: ${inq.business_name}\nContext: ${inq.business_context}\nDetails: ${inq.project_details}\nDate: ${formattedDate}`;

              return (
                <div
                  key={inq.id}
                  className="rounded-2xl border border-white/10 bg-[#060c18] p-6 sm:p-7 shadow-lg transition-all hover:border-cyan-400/40"
                >
                  {/* Top Bar: Contact Name, Company & Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="size-9 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 text-sm">
                        {inq.contact_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                          <span>{inq.contact_name}</span>
                          {inq.business_name && inq.business_name !== "Not specified" && (
                            <span className="text-sm font-normal text-slate-400 font-sans">
                              at <strong className="text-slate-200">{inq.business_name}</strong>
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Services pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {inq.services.map((svc) => (
                          <span
                            key={svc}
                            className="rounded-full bg-cyan-500/10 border border-cyan-400/30 px-2.5 py-0.5 text-[11px] font-mono text-cyan-300 font-medium"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>

                      <span className="font-mono text-xs text-slate-400 whitespace-nowrap">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    {/* Left: Project Details & Requirements */}
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block font-semibold mb-1.5">
                        Inquiry Message & Scope
                      </span>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {inq.project_details}
                      </div>

                      {/* Online context / website */}
                      {inq.business_context && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-300 font-mono">
                          <Globe className="size-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{inq.business_context}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Actions & Direct Response */}
                    <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-black/40 p-4">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block font-semibold mb-1">
                          Prospect Contact
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <a
                            href={`mailto:${inq.email}`}
                            className="font-mono text-sm text-cyan-300 hover:underline flex items-center gap-1.5 truncate"
                          >
                            <Mail className="size-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{inq.email}</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(inq.email, `email-${inq.id}`)}
                            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                            title="Copy email address"
                          >
                            {copiedId === `email-${inq.id}` ? (
                              <Check className="size-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                        <Button
                          asChild
                          size="sm"
                          className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-xs h-9 grow sm:grow-0"
                        >
                          <a href={mailtoUrl}>
                            <Mail className="size-3.5 mr-1.5" />
                            <span>Reply via Email</span>
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(summaryText, `summary-${inq.id}`)}
                          className="border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 text-xs h-9"
                          title="Copy full inquiry to clipboard"
                        >
                          {copiedId === `summary-${inq.id}` ? (
                            <>
                              <Check className="size-3.5 mr-1.5 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5 mr-1.5" />
                              <span>Copy Details</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(inq.id)}
                          disabled={deletingId === inq.id}
                          className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-xs h-9 ml-auto"
                          title="Delete record"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
