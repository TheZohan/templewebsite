"use client";

export function EtherealBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Top-right warm blob */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #d4a843 0%, #7a4fbf 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Bottom-left cool blob */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, #3d2f6b 0%, #7a9e7e 60%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />
      {/* Center mist */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, #c4a882 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
