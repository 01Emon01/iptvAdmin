"use client";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { NodeApi } from "@/api/axios";

type Categories = {
  id: string;
  name: string;
  slug: string;
};

type selectProps = {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export default function SelectArea({ categoryId, setCategoryId }: selectProps) {
  const [categories, setCategories] = useState<Categories[]>();
  const [category, setCategory] = useState<string>("Choose a category");
  const [drop, setDrop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = ({ id, name }: { id: string; name: string }) => {
    setDrop(false);
    setCategory(name);
    setCategoryId(id);
  };

  const fetchCategory = async () => {
    const res = await NodeApi.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!categories || !categoryId) return;

    const selected = categories.find((cat) => cat.id === categoryId);

    if (selected) {
      setCategory(selected.name);
    }
  }, [categories, categoryId]);

  return (
    <div ref={menuRef} className="selectArea-wrap relative">
      <div className="select-area" onClick={() => setDrop((prev) => !prev)}>
        <div className="choices-area-text">{category}</div>
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
              transitionEnd: { overflow: "unset" },
            }}
            exit={{
              opacity: 0,
              transform: "translateY(15px)",
              overflow: "hidden",
            }}
          >
            <ul>
              {categories?.map((item) => (
                <li
                  key={item.id}
                  className="select-items"
                  onClick={() => handleClick({ id: item.id, name: item.name })}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
