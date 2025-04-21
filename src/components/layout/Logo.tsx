
import React from "react";

export const Logo = ({
  size = 48,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <img
        src="/lovable-uploads/76e5b0d2-6cd4-4791-b612-b022957c3b82.png"
        alt="Najran University Campus Circle Logo"
        width={size}
        height={Math.round(size * (317 / 285))}
        className="object-contain rounded-sm mb-1"
        draggable={false}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          maxWidth: size,
          height: "auto"
        }}
      />
      {withText && (
        <span
          className="tracking-widest font-black text-lg text-primary-dark"
          style={{ letterSpacing: "0.3em" }}
          dir="auto"
        >
          NUC
        </span>
      )}
    </div>
  );
};
export default Logo;
