import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import {
    Download,
    Wifi,
    Mail,
    MessageSquare,
    Link2,
    History,
    Trash2,
    Copy,
    Sparkles,
    RotateCcw,
    Sliders,
    Palette
} from "lucide-react";
import { toast } from "sonner";

interface HistoryItem {
    id: string;
    type: string;
    title: string;
    value: string;
    date: string;
}

const logoGraduationCap = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ff0055" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`;
const logoCode = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2300f0ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const logoHeart = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23e11d48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

const QRCodeGenerator = () => {
    const [activeTab, setActiveTab] = useState<"text" | "wifi" | "email" | "sms">("text");

    // Tab states
    const [text, setText] = useState("");
    const [wifiSSID, setWifiSSID] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");
    const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
    const [emailTo, setEmailTo] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [smsPhone, setSmsPhone] = useState("");
    const [smsMessage, setSmsMessage] = useState("");

    // Styling States
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [qrSize, setQrSize] = useState(220);
    const [logoType, setLogoType] = useState<"none" | "cap" | "code" | "heart">("none");

    // History State
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("student-qr-history");
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const saveHistory = (val: string, displayTitle: string) => {
        if (!val.trim()) return;

        // Avoid exact duplicate matches in immediate history
        const isDuplicate = history.some(item => item.value === val);
        if (isDuplicate) return;

        const newItem: HistoryItem = {
            id: Math.random().toString(36).substr(2, 9),
            type: activeTab,
            title: displayTitle,
            value: val,
            date: new Date().toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        const updated = [newItem, ...history.slice(0, 9)]; // Limit to 10 history items
        setHistory(updated);
        localStorage.setItem("student-qr-history", JSON.stringify(updated));
    };

    const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem("student-qr-history", JSON.stringify(updated));
        toast.success("History item deleted");
    };

    const loadHistoryItem = (item: HistoryItem) => {
        setActiveTab(item.type as any);
        if (item.type === "text") {
            setText(item.value);
        } else if (item.type === "wifi") {
            // Parse WIFI:S:ssid;T:security;P:password;;
            const ssidMatch = item.value.match(/S:([^;]+)/);
            const securityMatch = item.value.match(/T:([^;]+)/);
            const passwordMatch = item.value.match(/P:([^;]+)/);
            if (ssidMatch) setWifiSSID(ssidMatch[1]);
            if (securityMatch) setWifiSecurity(securityMatch[1] as any);
            if (passwordMatch) setWifiPassword(passwordMatch[1]);
        } else if (item.type === "email") {
            // Parse mailto:to?subject=subject&body=body
            const url = new URL(item.value);
            setEmailTo(url.pathname);
            setEmailSubject(url.searchParams.get("subject") || "");
            setEmailBody(url.searchParams.get("body") || "");
        } else if (item.type === "sms") {
            // Parse sms:phone?body=message
            const parts = item.value.split("?");
            setSmsPhone(parts[0].replace("sms:", ""));
            if (parts[1]) {
                const bodyMatch = parts[1].match(/body=([^&]+)/);
                if (bodyMatch) setSmsMessage(decodeURIComponent(bodyMatch[1]));
            }
        }
        toast.info(`Loaded: ${item.title}`);
    };

    // Get QR Value
    const getQRValue = () => {
        switch (activeTab) {
            case "wifi":
                return `WIFI:S:${wifiSSID};T:${wifiSecurity};P:${wifiPassword};;`;
            case "email":
                if (!emailTo) return "";
                return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            case "sms":
                if (!smsPhone) return "";
                return `sms:${smsPhone}?body=${encodeURIComponent(smsMessage)}`;
            case "text":
            default:
                return text;
        }
    };

    const getQRTitle = () => {
        switch (activeTab) {
            case "wifi":
                return `Wi-Fi: ${wifiSSID || "Unnamed"}`;
            case "email":
                return `Email to: ${emailTo || "None"}`;
            case "sms":
                return `SMS to: ${smsPhone || "None"}`;
            case "text":
            default:
                return text.length > 25 ? text.substring(0, 22) + "..." : text || "Plain Text";
        }
    };

    const downloadQR = (format: "png" | "svg") => {
        const qrValue = getQRValue();
        if (!qrValue) {
            toast.error("Please enter data to generate a QR Code");
            return;
        }

        saveHistory(qrValue, getQRTitle());

        if (format === "png") {
            const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
            if (!canvas) return;

            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `student-qr-${activeTab}.png`;
            link.click();
            toast.success("Downloaded QR Code as PNG!");
        } else {
            const svg = document.getElementById("qr-svg");
            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const svgUrl = URL.createObjectURL(svgBlob);
            const link = document.createElement("a");
            link.href = svgUrl;
            link.download = `student-qr-${activeTab}.svg`;
            link.click();
            URL.revokeObjectURL(svgUrl);
            toast.success("Downloaded QR Code as SVG!");
        }
    };

    // Get current logo source
    const getLogoSrc = () => {
        if (logoType === "cap") return logoGraduationCap;
        if (logoType === "code") return logoCode;
        if (logoType === "heart") return logoHeart;
        return undefined;
    };

    const qrValue = getQRValue();

    return (
        <ToolLayout title="QR Code Generator">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* LEFT COLUMN: CONFIGURATION */}
                <div className="md:col-span-7 space-y-6">

                    {/* TABS */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab("text")}
                            className={`flex flex-col items-center justify-center py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "text"
                                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Link2 className="h-4 w-4 mb-1" />
                            <span>Link/Text</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("wifi")}
                            className={`flex flex-col items-center justify-center py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "wifi"
                                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Wifi className="h-4 w-4 mb-1" />
                            <span>Wi-Fi</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("email")}
                            className={`flex flex-col items-center justify-center py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "email"
                                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Mail className="h-4 w-4 mb-1" />
                            <span>Email</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("sms")}
                            className={`flex flex-col items-center justify-center py-2.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "sms"
                                ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <MessageSquare className="h-4 w-4 mb-1" />
                            <span>SMS</span>
                        </button>
                    </div>

                    {/* INPUT FIELDS ACCORDING TO TABS */}
                    <div className="p-5 rounded-xl border border-white/10 bg-black/30 space-y-4">
                        {activeTab === "text" && (
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">URL or Plain Text</label>
                                <Input
                                    placeholder="https://example.com or study notes..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                />
                            </div>
                        )}

                        {activeTab === "wifi" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Network SSID (Name)</label>
                                    <Input
                                        placeholder="Classroom Wi-Fi"
                                        value={wifiSSID}
                                        onChange={(e) => setWifiSSID(e.target.value)}
                                        className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Password</label>
                                        <Input
                                            type="password"
                                            placeholder="Security key"
                                            value={wifiPassword}
                                            onChange={(e) => setWifiPassword(e.target.value)}
                                            className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Security</label>
                                        <select
                                            value={wifiSecurity}
                                            onChange={(e: any) => setWifiSecurity(e.target.value)}
                                            className="w-full h-10 px-3 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-red-500/50 outline-none"
                                        >
                                            <option value="WPA">WPA/WPA2</option>
                                            <option value="WEP">WEP</option>
                                            <option value="nopass">Unsecured</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "email" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Recipient Email</label>
                                    <Input
                                        type="email"
                                        placeholder="professor@university.edu"
                                        value={emailTo}
                                        onChange={(e) => setEmailTo(e.target.value)}
                                        className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Subject</label>
                                    <Input
                                        placeholder="Assignment Submission"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Message Body</label>
                                    <textarea
                                        placeholder="Hello Professor..."
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        className="w-full h-24 p-3 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-red-500/50 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "sms" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone Number</label>
                                    <Input
                                        placeholder="+1234567890"
                                        value={smsPhone}
                                        onChange={(e) => setSmsPhone(e.target.value)}
                                        className="bg-black/50 border-white/10 text-white focus:border-red-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">SMS Message</label>
                                    <textarea
                                        placeholder="Hey! Can you send me the lecture notes?"
                                        value={smsMessage}
                                        onChange={(e) => setSmsMessage(e.target.value)}
                                        className="w-full h-24 p-3 rounded-md bg-black/50 border border-white/10 text-white text-sm focus:border-red-500/50 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CUSTOMIZATION OPTIONS */}
                    <div className="p-5 rounded-xl border border-white/10 bg-black/30 space-y-5">
                        <h3 className="text-sm font-semibold tracking-wider text-white flex items-center gap-2">
                            <Sliders className="h-4 w-4 text-red-500" />
                            STYLING & DESIGN
                        </h3>

                        {/* COLORS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                                    <Palette className="h-3 w-3 text-red-500" />
                                    QR Color
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="w-9 h-9 rounded cursor-pointer border border-white/10 bg-transparent"
                                    />
                                    <div className="flex flex-wrap gap-1">
                                        {["#000000", "#ff0055", "#00f0ff", "#39ff14", "#7b2cbf"].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setFgColor(c)}
                                                className="w-5 h-5 rounded-full border border-white/20 transition-all hover:scale-110"
                                                style={{ backgroundColor: c }}
                                                title={c}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                                    <Palette className="h-3 w-3 text-cyan-400" />
                                    Background
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-9 h-9 rounded cursor-pointer border border-white/10 bg-transparent"
                                    />
                                    <div className="flex flex-wrap gap-1">
                                        {["#ffffff", "#000000", "#0b0f1a", "#f3f4f6"].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setBgColor(c)}
                                                className="w-5 h-5 rounded-full border border-white/20 transition-all hover:scale-110"
                                                style={{ backgroundColor: c }}
                                                title={c}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LOGO IN CENTER */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-yellow-400" />
                                Center Symbol Icon
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { name: "None", value: "none" },
                                    { name: "🎓 Study", value: "cap" },
                                    { name: "💻 Dev", value: "code" },
                                    { name: "❤️ Heart", value: "heart" }
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        onClick={() => setLogoType(item.value as any)}
                                        className={`py-1.5 rounded-lg border text-xs font-semibold transition ${logoType === item.value
                                            ? "bg-white/15 border-red-500 text-white"
                                            : "border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SIZE */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <span>QR Code Scale</span>
                                <span className="font-mono text-white">{qrSize}px</span>
                            </div>
                            <input
                                type="range"
                                min="140"
                                max="280"
                                value={qrSize}
                                onChange={(e) => setQrSize(Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: PREVIEW AND HISTORY */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">

                    {/* PREVIEW CONTAINER */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center gap-5 relative overflow-hidden group">

                        {/* GLOW DECORATOR */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-xl rounded-full" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 blur-xl rounded-full" />

                        <div className="w-full border-b border-white/5 pb-3 flex justify-between items-center relative z-10">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Live Engine Preview
                            </span>
                            {qrValue && (
                                <button
                                    onClick={() => {
                                        setText("");
                                        setWifiSSID("");
                                        setWifiPassword("");
                                        setEmailTo("");
                                        setEmailSubject("");
                                        setEmailBody("");
                                        setSmsPhone("");
                                        setSmsMessage("");
                                        setLogoType("none");
                                        setFgColor("#000000");
                                        setBgColor("#ffffff");
                                        toast.success("Generator reset");
                                    }}
                                    className="p-1 text-muted-foreground hover:text-white transition"
                                    title="Reset Generator"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="relative p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-red-500/20 transition-all flex items-center justify-center h-[260px] w-full">
                            {qrValue ? (
                                <div className="p-3 bg-white rounded-lg flex items-center justify-center shadow-lg transition-transform hover:scale-102">
                                    {/* Invisible Canvas for PNG download */}
                                    <div className="hidden">
                                        <QRCodeCanvas
                                            id="qr-canvas"
                                            value={qrValue}
                                            size={512} // HD sizing for export
                                            bgColor={bgColor}
                                            fgColor={fgColor}
                                            level="H"
                                            imageSettings={
                                                getLogoSrc()
                                                    ? {
                                                        src: getLogoSrc()!,
                                                        height: 64,
                                                        width: 64,
                                                        excavate: true,
                                                    }
                                                    : undefined
                                            }
                                        />
                                    </div>
                                    {/* Visible SVG for crisp screen rendering and vector export */}
                                    <QRCodeSVG
                                        id="qr-svg"
                                        value={qrValue}
                                        size={qrSize}
                                        bgColor={bgColor}
                                        fgColor={fgColor}
                                        level="H"
                                        imageSettings={
                                            getLogoSrc()
                                                ? {
                                                    src: getLogoSrc()!,
                                                    height: qrSize * 0.15,
                                                    width: qrSize * 0.15,
                                                    excavate: true,
                                                }
                                                : undefined
                                        }
                                    />
                                </div>
                            ) : (
                                <div className="text-center p-6 space-y-2">
                                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mx-auto text-muted-foreground animate-pulse">
                                        🚀
                                    </div>
                                    <p className="text-sm font-medium text-white">Awaiting Input Data</p>
                                    <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">Fill in the fields on the left to start generating your F1 QR code.</p>
                                </div>
                            )}
                        </div>

                        {qrValue && (
                            <div className="w-full grid grid-cols-2 gap-2 relative z-10">
                                <Button
                                    onClick={() => downloadQR("png")}
                                    className="btn-f1 flex items-center justify-center gap-1.5 h-10 px-2 rounded-xl text-xs font-semibold w-full"
                                >
                                    <Download className="h-4 w-4" />
                                    PNG Image
                                </Button>
                                <Button
                                    onClick={() => downloadQR("svg")}
                                    variant="outline"
                                    className="border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-white flex items-center justify-center gap-1.5 h-10 px-2 rounded-xl text-xs font-semibold w-full"
                                >
                                    <Download className="h-4 w-4 text-cyan-400" />
                                    Vector SVG
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* HISTORY CONTAINER */}
                    <div className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex-1 flex flex-col min-h-[220px]">
                        <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
                            <History className="h-4 w-4 text-cyan-400" />
                            Quick History
                        </h3>

                        {history.length > 0 ? (
                            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                                {history.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => loadHistoryItem(item)}
                                        className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/5 flex items-center justify-between cursor-pointer transition group"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-white truncate group-hover:text-cyan-400 transition">
                                                {item.title}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground font-mono truncate">
                                                {item.date} • {item.type.toUpperCase()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => deleteHistoryItem(item.id, e)}
                                            className="p-1 text-muted-foreground hover:text-red-400 transition"
                                            title="Delete from history"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-center p-4 border border-dashed border-white/5 rounded-xl">
                                <p className="text-xs text-muted-foreground">Generated QR codes will save here for quick download</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </ToolLayout>
    );
};

export default QRCodeGenerator;