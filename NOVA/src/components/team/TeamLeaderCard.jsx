import * as motion from "motion/react-client";

export default function TeamLeaderCard({
  name,
  role,
  image,
  accent = "#38bdf8",
}) {
  return (
    <motion.div
      className="
        relative
        w-full
        max-w-[360px]
        aspect-[3/4]
        rounded-3xl
        overflow-hidden
        bg-black
        mx-auto
        cursor-pointer
      "
      variants={leaderVariants}
      whileHover={{
        y: -10,
        rotate: -2,
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 180 }}
    >
      {/* IMAGE — bright & untouched */}
      <img
        src={image}
        alt={name}
        className="
          absolute inset-0
          h-full w-full
          object-cover
          brightness-105
          contrast-105
        "
      />

      {/* LOCALIZED GRADIENT (bottom only) */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          h-36
          bg-gradient-to-t
          from-black/80
          via-black/40
          to-transparent
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="absolute bottom-6 left-6 right-6">
        <h2 className="text-xl font-semibold text-white leading-tight">
          {name}
        </h2>
        <p className="text-sm text-white/80 mt-1">
          {role}
        </p>

        {/* Accent underline */}
        <div
          className="mt-3 h-[3px] w-12 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
    </motion.div>
  );
}

/* ================= MOTION ================= */

const leaderVariants = {
  offscreen: {
    opacity: 0,
    y: 80,
    rotate: -4,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};
