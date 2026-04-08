import { useEffect, useState } from "react";
import * as motion from "motion/react-client";

export default function TeamEditorialCard({ person, accent }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const images = person.images;

  /* ========= Boomerang Image Animation ========= */
  useEffect(() => {
    if (!active || images.length < 2) return;

    let dir = 1;
    const interval = setInterval(() => {
      setIndex((i) => {
        if (i === images.length - 1) dir = -1;
        if (i === 0) dir = 1;
        return i + dir;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [active, images.length]);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => {
        setActive(false);
        setIndex(0);
      }}
      onTap={() => setActive((v) => !v)}
      animate={{
        scale: active ? 1.07 : 1,
        rotate: active ? -2 : 0,
        backgroundColor: active ? accent : "#111827",
      }}
      transition={{ type: "spring", stiffness: 90 }}
    > 
      <div className="
        w-full
        md:w-[600px]
        h-[640px]
        rounded-3xl
        bg-neutral-900
        cursor-pointer
        flex flex-col
        overflow-hidden
        p-6"
        style={{ backgroundColor: active ? accent : "#111827" }}
      >
        {/* IMAGE */}
        <div className="relative w-full h-[60%] rounded-2xl overflow-hidden">
          <img
            src={images[index]}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-end pt-6 text-white mt-8">
          {/* DEFAULT CONTENT */}
          {!active && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex flex-col justify-end'
            >
              <p className="text-sm uppercase tracking-widest opacity-70">
                {person.role}
              </p>

              <h3 className="text-3xl font-semibold mt-2">
                {person.name}
              </h3>

              <p className="text-sm mt-4 opacity-80 leading-relaxed">
                {person.bio}
              </p>

              <div
                className="mt-5 h-[3px] w-14 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </motion.div>
          )}

          {/* BIO CONTENT */}
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end h-full"
            >
              <p className="text-2xl leading-relaxed font-medium">
                “{person.about}”
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
