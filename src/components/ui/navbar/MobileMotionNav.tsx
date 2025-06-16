import React, { useState, useRef, useEffect } from "react";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { menuItems } from "@/data/data";
import SubMenu from "@/components/SubMenu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const MobileMotionNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const sidebarVariants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(20px at 40px 40px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  interface PathProps {
    d?: string;
    variants: Variants;
    transition?: { duration: number };
  }

  const Path = (props: PathProps) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );

  const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button style={toggleContainer} onClick={toggle} className="bg-white">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );

  const container: React.CSSProperties = {
    justifyContent: "flex-start",
    alignItems: "stretch",
    flex: 1,
    width: 500,
    maxWidth: "100%",
    height: 400,
    backgroundColor: "var(--accent)",
    borderRadius: 20,
    overflow: "hidden",
  };

  const nav: React.CSSProperties = {
    width: 300,
  };

  const background: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 90,
    bottom: 0,
    width: 300,
  };

  const toggleContainer: React.CSSProperties = {
    outline: "none",
    border: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    cursor: "pointer",
    position: "absolute",
    top: 18,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const list: React.CSSProperties = {
    listStyle: "none",
    padding: 25,
    margin: 0,
    position: "absolute",
    top: 80,
    width: 230,
  };

  const listItem: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    listStyle: "none",
    marginBottom: 20,
    cursor: "pointer",
  };

  const iconPlaceholder: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    flex: "40px 0",
    marginRight: 20,
  };

  const textPlaceholder: React.CSSProperties = {
    borderRadius: 5,
    width: 200,
    height: 20,
    flex: 1,
  };
  return (
    <div style={container} className="sm:hidden flex">
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={nav}
        className="flex"
      >
        <motion.div
          style={background}
          variants={sidebarVariants}
          className="bg-gradient-to-r from-sky-500 to-sky-800"
        />
        <motion.ul
          style={list}
          variants={navVariants}
          className={`flex flex-col`}
        >
          {menuItems.map((item) => (
            <motion.li
              style={listItem}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              className="relative group text-base font-normal pb-2"
            >
              <Link
                href={item.url}
                className="flex flex-row dark:hover:text-slate-200 dark:text-slate hover:text-slate-700 hover:font-semibold transition duration-200 ease-in text-slate-200 text-base font-semibold"
              >
                {item.label} <ChevronDown className="text-sm w-4" />
              </Link>
              {item.subMenu && <SubMenu items={item.subMenu} />}
            </motion.li>
          ))}
        </motion.ul>
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </motion.nav>
    </div>
  );
};

export default MobileMotionNav;

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
