import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-voro-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main
          id="main-content"
          className="flex-1 flex flex-col gap-6 p-5 md:p-8 max-w-[1400px] w-full mx-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
