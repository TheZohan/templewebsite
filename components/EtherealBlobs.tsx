"use client";

export function EtherealBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gold top-right */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #d4a843 0%, #1e2f52 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Navy blue bottom-left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #1e3a7a 0%, #0d1628 60%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />
      {/* Centre warm gold mist */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse, #e8c96a 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
