import * as motion from "motion/react-client";

export default function TeamMemberCard({
  member,
  accent = "#38bdf8",
}) {
  return (
    <div
      className="
        relative
        h-[220px]
        rounded-2xl
        overflow-hidden
        bg-black
      "
    >
      <motion.div
        className="
          absolute inset-0
          rounded-2xl
          overflow-hidden
          cursor-pointer
        "
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="hover"
        variants={cardVariants}
        transition={{ type: "spring", stiffness: 220 }}
      >
        {/* IMAGE CARD */}
        <img
          src={member.image}
          alt={member.name}
          className="
            absolute inset-0
            h-full w-full
            object-cover
            brightness-105
            contrast-105
          "
        />

        {/* BOTTOM GRADIENT (LOCAL) */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            h-24
            bg-gradient-to-t
            from-black/80
            via-black/40
            to-transparent
            pointer-events-none
          "
        />

        {/* CONTENT */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-sm font-semibold text-white">
            {member.name}
          </h3>
          <p className="text-xs text-white/75 mt-0.5">
            {member.role}
          </p>

          <div
            className="mt-2 h-1 w-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </div>
      </motion.div>
    </div>
  );
}

const cardVariants = {
  rest: {
    y: 80,
    rotate: 0,
  },
  hover: {
    y: 0,
    rotate: -2,
  },
};
