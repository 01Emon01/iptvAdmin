"use client";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import SelectImage from "./interface/SelectImage";

type Products = {
  id: string;
  images: string[];
  name: string;
};

type Selects = {
  id: string;
  name: string;
};

type SelectProps = {
  data: Products[];
  select: Selects;
  onSelect: (id: string, name: string) => void;
};

export default function SelectArea2({ data, select, onSelect }: SelectProps) {
  const [drop, setDrop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClick = (id: string, name: string) => {
    setDrop(false);
    onSelect(id, name);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={menuRef} className="selectArea-wrap relative">
      <div className="select-area" onClick={() => setDrop((prev) => !prev)}>
        <div className="choices-area-text">
          {select?.name ? select?.name : "Choose a product"}
        </div>
        <div className={`drop-icon ${drop && "upside"}`}>
          <MdArrowDropDown size={22} />
        </div>
      </div>
      <AnimatePresence>
        {drop && (
          <motion.div
            className="select-options"
            initial={{
              opacity: 0,
              overflow: "hidden",
              transform: "translateY(15px)",
            }}
            animate={{
              opacity: 1,
              overflow: "hidden",
              transform: "translateY(0px)",
              transitionEnd: { overflow: "auto" },
            }}
            exit={{
              opacity: 0,
              transform: "translateY(15px)",
              overflow: "hidden",
            }}
          >
            <ul>
              {data.map((item) => (
                <li
                  className={`select-items ${item.id === select.id ? "bg-gray-900" : ""}`}
                  onClick={() => handleClick(item.id, item.name)}
                  key={item.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="prd-thumb border border-gray-600 p-1">
                      <SelectImage url={item.images[0]} />
                    </div>
                    <span>{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
